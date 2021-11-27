import { IsISBN, Length } from "class-validator";
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
  @Field(() => String, { nullable: true })
  query?: string;
}

@InputType()
export class BookInput {
  @Field(() => String)
  @IsISBN(undefined, { message: "Given ISBN in invalid" })
  isbn: string;
}

@InputType()
export class BooksFromApiInput {
  @Field(() => String)
  @Length(3, 255, { message: "Length must be between 3 and 255" })
  query: string;
}
