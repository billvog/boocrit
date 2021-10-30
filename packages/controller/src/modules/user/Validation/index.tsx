import * as yup from "yup";

export const UserValidation = {
  FirstName: yup.string().min(2).max(255),
  LastName: yup.string().min(2).max(255),
  Email: yup.string().email(),
  Password: yup.string().min(6),
};
