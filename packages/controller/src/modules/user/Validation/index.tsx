import * as yup from "yup";

export const UserValidation = {
  UID: yup
    .string()
    .min(2)
    .max(24)
    .matches(
      /^([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9])$/,
      "UID should only contain latin letters, numbers and dashes"
    )
    .label("UID"),
  FirstName: yup.string().min(2).max(255).label("First name"),
  LastName: yup.string().min(2).max(255).label("Last name"),
  Email: yup.string().email().label("Email"),
  Password: yup.string().min(6).label("Password"),
};
