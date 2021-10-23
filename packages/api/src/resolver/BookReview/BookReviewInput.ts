import { Length, IsISBN, Min, IsNumber, Max } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class CreateBookReviewInput {
  @Field()
  @IsISBN("13", { message: "Book ISBN identifier is not valid" })
  bookId: string;

  @Field()
  @IsNumber()
  @Min(0, { message: "Rate can be between 0 and 10" })
  @Max(10, { message: "Rate can be between 0 and 10" })
  rate: number;

  @Field()
  @Length(3, 5000, { message: "Length must be between 3 and 5000" })
  body: string;
}
