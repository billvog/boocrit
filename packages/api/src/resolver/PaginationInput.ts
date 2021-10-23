import { Field, InputType, Int } from "type-graphql";

@InputType()
export class PaginationInput {
  @Field(() => Int)
  limit: number;
  @Field(() => Int, { nullable: true })
  skip: number;
}
