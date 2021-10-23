import { ObjectType, Field } from "type-graphql";
import { FieldError } from "../FieldError";
import { BookReview } from "../../entity/BookReview";

@ObjectType()
export class BookReviewResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field({ nullable: true })
  bookReview?: BookReview;
}
