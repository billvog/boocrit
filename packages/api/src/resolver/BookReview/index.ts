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
import { BookReview } from "../../entity/BookReview";
import { User } from "../../entity/User";
import { Book } from "../../type/Book";
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
    const user = await User.findOne(root.revieweeId);
    if (!user) {
      throw new Error("Reviewee of this review couldn't be found");
    }

    return user;
  }

  @FieldResolver(() => Book)
  async book(@Root() root: BookReview): Promise<Book> {
    try {
      const foundBook = await isbn.resolve(root.bookId);
      return foundBook;
    } catch {
      throw new Error("Book with this ISBN couldn't be found");
    }
  }

  @Query(() => PaginatedBookReviewsResponse)
  async BookReviewsByISBN(
    @Arg("input") input: BookReviewsByIsbnInput,
    @Arg("pagination") pagination: PaginationInput
  ): Promise<PaginatedBookReviewsResponse> {
    // Check if book with that ISBN exists
    try {
      await isbn.resolve(input.isbn);
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
    // Check if book with that ISBN exists
    try {
      await isbn.resolve(input.bookId);
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
