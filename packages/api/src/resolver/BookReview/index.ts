import isbn from "node-isbn";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Book } from "../../entity/Book";
import { BookReview } from "../../entity/BookReview";
import { User } from "../../entity/User";
import { BookType } from "../../type/BookType";
import { MyContext } from "../../type/MyContext";
import { PaginationInput } from "../PaginationInput";
import { isAuthenticated } from "../User/isAuthMiddleware";
import {
  BookReviewsByIsbnInput,
  CreateBookReviewInput,
} from "./BookReviewInput";
import {
  BookReviewResponse,
  PaginatedBookReviewsResponse,
} from "./BookReviewResponse";

@Resolver(BookReview)
export class BookReviewResolver {
  @FieldResolver(() => User)
  async reviewee(@Root() root: BookReview): Promise<User> {
    const user = await User.findOne({ where: { id: root.revieweeId } });
    if (!user) {
      throw new Error("Reviewee of this review couldn't be found");
    }

    return user;
  }

  @FieldResolver(() => Book)
  async book(@Root() root: BookReview): Promise<Book> {
    try {
      const book = await Book.findOne(root.bookId);
      if (!book) {
        throw new Error();
      }

      return book;
    } catch {
      throw new Error("Book couldn't be found");
    }
  }

  @Query(() => PaginatedBookReviewsResponse)
  async BookReviewsByISBN(
    @Arg("input") input: BookReviewsByIsbnInput,
    @Arg("pagination") pagination: PaginationInput
  ): Promise<PaginatedBookReviewsResponse> {
    // Check if book with that ISBN exists
    const book = await Book.findOne(input.isbn);
    if (!book) {
      return {
        errors: [
          {
            path: "isbn",
            message: "Book with ISBN couldn't be found",
          },
        ],
      };
    }

    const realLimit = Math.min(50, pagination.limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = getConnection()
      .getRepository(BookReview)
      .createQueryBuilder("bookreview")
      .orderBy('bookreview."createdAt"', "DESC")
      .limit(realLimitPlusOne)
      .where('bookreview."bookId" = :bookId', { bookId: input.isbn });

    if (pagination.skip && pagination.skip > 0) {
      qb.offset(pagination.skip);
    }

    const [bookReviews, count] = await qb.getManyAndCount();
    return {
      bookReviews: bookReviews.slice(0, realLimit),
      hasMore: bookReviews.length === realLimitPlusOne,
      count,
    };
  }

  @Mutation(() => BookReviewResponse)
  @UseMiddleware(isAuthenticated)
  async CreateBookReview(
    @Arg("input") input: CreateBookReviewInput,
    @Ctx() ctx: MyContext
  ): Promise<BookReviewResponse> {
    // Check if a review has already been made from that user on that book
    if (
      await BookReview.findOne({
        where: { revieweeId: ctx.me.id, bookId: input.bookId },
      })
    ) {
      return {
        errors: [
          {
            path: "bookId",
            message: "You have already reviewed that book",
          },
        ],
      };
    }

    // Insert book into database if it's not already
    let book = await Book.findOne(input.bookId);
    if (!book) {
      // Check if book with that ISBN exists
      let fetchedBook: BookType;
      try {
        fetchedBook = await isbn.resolve(input.bookId);
      } catch {
        return {
          errors: [
            {
              path: "isbn",
              message: "Given ISBN doesn't match to any book",
            },
          ],
        };
      }

      try {
        book = await Book.create({
          id: input.bookId,
          title: fetchedBook.title,
          description: fetchedBook.description,
          publisher: fetchedBook.publisher,
          language: fetchedBook.language,
          pageCount: fetchedBook.pageCount,
          publishedDate: fetchedBook.publishedDate,
          categories: fetchedBook.categories,
          smallThumbnail: fetchedBook.imageLinks?.smallThumbnail,
          thumbnail: fetchedBook.imageLinks?.thumbnail,
        }).save();
      } catch {
        return {
          errors: [
            {
              path: "_",
              message: "Couldn't create book",
            },
          ],
        };
      }
    }

    const review = await BookReview.create({
      bookId: input.bookId,
      body: input.body,
      rate: input.rate,
      revieweeId: ctx.me.id,
    });

    await review.save();

    return {
      bookReview: review,
    };
  }
}
