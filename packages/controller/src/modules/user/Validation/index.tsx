import * as yup from "yup";

export const UserValidation = {
  FirstName: yup.string().min(2).max(255).label("First name"),
  LastName: yup.string().min(2).max(255).label("Last name"),
  Email: yup.string().email().label("Email"),
  Password: yup.string().min(6).label("Password"),
};
