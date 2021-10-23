import isbn from "node-isbn";
import { User } from "../../entity/User";
import { Book } from "../../type/Book";
import { MyContext } from "../../type/MyContext";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { BookReview } from "../../entity/BookReview";
import { isAuthenticated } from "../User/isAuthMiddleware";
import { CreateBookReviewInput } from "./BookReviewInput";
import { BookReviewResponse } from "./BookReviewResponse";

@Resolver(BookReview)
export class BookReviewResolver {
  @FieldResolver(() => User)
  async reviewee(@Root() root: BookReview): Promise<User> {
    const user = await User.findOne(root.revieweeId);
    return user!;
  }

  @FieldResolver(() => Book)
  async book(@Root() root: BookReview): Promise<Book> {
    const foundBook = await isbn.resolve(root.bookId);
    if (!foundBook) {
      throw new Error("Book with this ISBN couldn't be found");
    }

    return foundBook;
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

    // Check if book with that isbn exists
    if (!(await isbn.resolve(input.bookId))) {
      return {
        errors: [
          {
            path: "bookId",
            message: "Can't find a book with the given ISBN",
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
