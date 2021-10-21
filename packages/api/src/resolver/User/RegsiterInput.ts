import { Length, IsEmail, MinLength } from "class-validator";
import { InputType, Field } from "type-graphql";
import { IsEmailAlreadyUsed } from "./isEmailUsed";

@InputType()
export class RegisterInput {
  @Field()
  @Length(2, 255, { message: "Length must be between 2 and 255" })
  firstName: string;

  @Field()
  @Length(2, 255, { message: "Length must be between 2 and 255" })
  lastName: string;

  @Field()
  @IsEmail(undefined, { message: "Invalid email format" })
  @IsEmailAlreadyUsed({ message: "This email is already taken" })
  email: string;

  @Field()
  @MinLength(6, { message: "Length must be greater than 6" })
  password: string;
}
