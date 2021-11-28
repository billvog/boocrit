import {
  Arg,
  FieldResolver,
  Int,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Book } from "../../entity/Book";
import { BookReview } from "../../entity/BookReview";
import {
  FetchBookById,
  FetchBookResponse,
  FetchedBookToBookEntity,
  FetchedBookWithParams,
} from "../../utils/BooksAPIClient";
import { PaginationInput } from "../PaginationInput";
import { isAuthenticated } from "../User/isAuthMiddleware";
import {
  BookInput,
  BooksFromApiInput,
  BooksInput,
  BooksQueryOrderBy,
} from "./BookIinput";
import { PaginatedBooksResponse } from "./BookResponse";
import IsbnUtils from "isbn-utils";

@Resolver(Book)
export class BookResolver {
  @FieldResolver(() => Int)
  async numOfRates(@Root() book: Book) {
    return await BookReview.count({ where: { bookId: book.id } });
  }

  @Query(() => Book, { nullable: true })
  async Book(@Arg("options") options: BookInput): Promise<Book | undefined> {
    const book = await Book.findOne({ where: { id: options.isbn } });
    return book;
  }

  @Query(() => PaginatedBooksResponse)
  async Books(
    @Arg("pagination") pagination: PaginationInput,
    @Arg("options") options: BooksInput
  ): Promise<PaginatedBooksResponse> {
    const realLimit = Math.min(50, pagination.limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = getConnection()
      .getRepository(Book)
      .createQueryBuilder("book")
      .orderBy('book."createdAt"', "DESC")
      .limit(realLimitPlusOne);

    if (options.orderBy == BooksQueryOrderBy.rating) {
      qb.orderBy('book."avgRate"', "DESC");
    }

    if (!!options.query) {
      qb.where(
        `book.id = :exactQuery or 
        lower(book.title) like lower(:likeQuery) or 
        lower(array_to_string(book.authors, ',')) like lower(:likeQuery) or 
        lower(array_to_string(book.categories, ',')) like lower(:likeQuery)`,
        {
          exactQuery: options.query,
          likeQuery: `%${options.query}%`,
        }
      );
    }

    if (pagination.skip && pagination.skip > 0) {
      qb.offset(pagination.skip);
    }

    const [books, count] = await qb.getManyAndCount();
    return {
      books: books.slice(0, realLimit),
      hasMore: books.length === realLimitPlusOne,
      count,
    };
  }

  @Query(() => PaginatedBooksResponse)
  @UseMiddleware(isAuthenticated)
  async BooksFromAPI(
    @Arg("options") options: BooksFromApiInput
  ): Promise<PaginatedBooksResponse> {
    let response: FetchBookResponse;

    const queryIsbn = IsbnUtils.parse(options.query);
    if (queryIsbn && queryIsbn.isValid()) {
      response = await FetchedBookWithParams(
        "isbn",
        queryIsbn.asIsbn13(),
        0,
        1
      );
    } else {
      response = await FetchedBookWithParams("", options.query, 0, 5);
    }

    let books: Book[] = [];
    if (response.totalItems > 0 && typeof response.items !== "undefined") {
      await Promise.all(
        response.items.map(async (b) => {
          if (
            b.volumeInfo.industryIdentifiers &&
            b.volumeInfo.industryIdentifiers[0].type === "OTHER" &&
            typeof b.id === "string"
          ) {
            const newbook = await FetchBookById(b.id);
            books.push(FetchedBookToBookEntity(newbook));
          } else {
            books.push(FetchedBookToBookEntity(b));
          }
        })
      );
    }

    return {
      books,
      count: response.totalItems,
    };
  }
}
