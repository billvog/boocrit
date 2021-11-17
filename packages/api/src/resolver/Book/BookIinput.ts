import { IsISBN } from "class-validator";
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

@InputType()
export class BookInput {
  @Field(() => String)
  @IsISBN(undefined, { message: "Given ISBN in invalid" })
  isbn: string;
}
