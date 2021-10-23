import { ObjectType, Field, Int } from "type-graphql";
import { FieldError } from "../FieldError";
import { BookReview } from "../../entity/BookReview";

@ObjectType()
export class BookReviewResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field({ nullable: true })
  bookReview?: BookReview;
}

@ObjectType()
export class PaginatedBookReviewsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => [BookReview], { nullable: true })
  bookReviews?: BookReview[];
  @Field(() => Boolean, { nullable: true })
  hasMore?: boolean;
  @Field(() => Int, { nullable: true })
  count?: number;
}
