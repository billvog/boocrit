import { Book } from "../../entity/Book";
import { ObjectType, Field, Int } from "type-graphql";
import { FieldError } from "../FieldError";

@ObjectType()
export class PaginatedBooksResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => [Book], { nullable: true })
  books?: Book[];
  @Field(() => Boolean, { nullable: true })
  hasMore?: boolean;
  @Field(() => Int, { nullable: true })
  count?: number;
}
