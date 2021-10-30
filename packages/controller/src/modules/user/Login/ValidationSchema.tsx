import * as yup from "yup";
import { UserValidation } from "../Validation";

export const LoginValidationSchema = yup.object().shape({
  email: UserValidation.Email.required(),
  password: UserValidation.Password.required(),
});
