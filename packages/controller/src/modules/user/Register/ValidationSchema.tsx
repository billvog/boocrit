import * as yup from "yup";
import { UserValidation } from "../Validation";

const VerificationCode = yup.string().length(6).label("Code");

export const Register1ValidationSchema = yup.object().shape({
  firstName: UserValidation.FirstName.required(),
  lastName: UserValidation.LastName.required(),
  email: UserValidation.Email.required(),
});

export const Register2ValidationSchema = yup.object().shape({
  email: UserValidation.Email.required(),
  code: VerificationCode.required(),
});

export const Register3ValidationSchema = yup.object().shape({
  password: UserValidation.Password.required(),
});

export const Register4ValidationSchema = yup.object().shape({
  firstName: UserValidation.FirstName.required(),
  lastName: UserValidation.LastName.required(),
  password: UserValidation.Password.required(),
});
