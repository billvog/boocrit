import {
  FetchBookByISBN,
  FetchedBook,
  FetchedBookToBookEntiry,
} from "../../utils/BooksAPIClient";
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
import { MyContext } from "../../type/MyContext";
import { UpdateBookAvgRate } from "../Book/BookUtils";
import { PaginationInput } from "../PaginationInput";
import { isAuthenticated } from "../User/isAuthMiddleware";
import {
  BookReviewsByIsbnInput,
  CreateBookReviewInput,
  MyBookReviewByIsbnInput,
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

  @Query(() => BookReviewResponse)
  async MyBookReviewByISBN(
    @Arg("input") input: MyBookReviewByIsbnInput
  ): Promise<BookReviewResponse> {
    const bookReview = await BookReview.findOne({
      where: { bookId: input.isbn },
    });

    return {
      bookReview,
    };
  }

  @Query(() => PaginatedBookReviewsResponse)
  @UseMiddleware(isAuthenticated)
  async BookReviewsByISBN(
    @Arg("input") input: BookReviewsByIsbnInput,
    @Arg("pagination") pagination: PaginationInput,
    @Ctx() ctx: MyContext
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
      .where('bookreview."revieweeId" != :userId', { userId: ctx.me.id })
      .andWhere('bookreview."bookId" = :bookId', { bookId: input.isbn })
      .limit(realLimitPlusOne);

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
      let fetchedBook: FetchedBook;
      try {
        fetchedBook = await FetchBookByISBN(input.bookId);
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
          ...FetchedBookToBookEntiry(fetchedBook),
          id: input.bookId,
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

    // After review is made update the average rate of the book (async)
    UpdateBookAvgRate(review.bookId);

    return {
      bookReview: review,
    };
  }
}
