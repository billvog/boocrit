import { InputType, Field, registerEnumType } from "type-graphql";

export enum BooksQueryOrderBy {
  rating,
  creationDate,
}

registerEnumType(BooksQueryOrderBy, {
  name: "OrderBy",
});

@InputType()
export class BooksInput {
  @Field(() => BooksQueryOrderBy)
  orderBy: BooksQueryOrderBy;
}
