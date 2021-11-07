import { Length, IsEmail, MinLength, Matches } from "class-validator";
import { InputType, Field } from "type-graphql";
import { IsEmailAlreadyUsed } from "./isEmailUsed";
import { IsUidAlreadyUsed } from "./isUidUsed";

@InputType()
export class RegisterInput1 {
  @Field()
  @Length(2, 24, {
    message: "Length must be between 2 and 24",
    groups: ["uid"],
  })
  @Matches(/^([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9])$/, {
    message: "UID should only contain latin letters, numbers and dashes",
    groups: ["uid"],
  })
  @IsUidAlreadyUsed({
    message: "This uid is already used",
    groups: ["uid", "is_uniqie"],
  })
  uid: string;

  @Field()
  @Length(2, 255, { message: "Length must be between 2 and 255" })
  firstName: string;

  @Field()
  @Length(2, 255, { message: "Length must be between 2 and 255" })
  lastName: string;

  @Field()
  @IsEmail(undefined, { message: "Invalid email format", groups: ["email"] })
  @IsEmailAlreadyUsed({
    message: "This email is already taken",
    groups: ["email", "is_uniqie"],
  })
  email: string;
}

@InputType()
export class RegisterInput2 {
  @Field()
  email: string;

  @Field()
  @Length(6, 6, { message: "Invalid format" })
  code: string;
}

@InputType()
export class RegisterInput4 extends RegisterInput1 {
  @Field()
  @Length(6, 6, { message: "Invalid format" })
  code: string;

  @Field()
  @MinLength(6, { message: "Length must be greater than 6" })
  password: string;
}

@InputType()
export class CredentialsInput {
  @Field()
  @IsEmail(undefined, { message: "Invalid email format" })
  email: string;

  @Field()
  @MinLength(6, { message: "Length must be greater than 6" })
  password: string;
}
