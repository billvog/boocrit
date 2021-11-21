import { Book } from "../../entity/Book";
import { Arg, FieldResolver, Int, Query, Resolver, Root } from "type-graphql";
import { PaginationInput } from "../PaginationInput";
import { PaginatedBooksResponse } from "./BookResponse";
import { getConnection } from "typeorm";
import { BookReview } from "../../entity/BookReview";
import { BookInput, BooksInput, BooksQueryOrderBy } from "./BookIinput";

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
}
