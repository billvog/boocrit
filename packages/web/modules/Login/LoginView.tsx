import { Form } from "formik";
import React from "react";
import { Header } from "../ui/Header";
import { InputField } from "../ui/InputField";

export const LoginPage: React.FC = ({}) => {
  return (
    <>
      <Header showLogin={false} />
      <Form>
        <InputField name="email" placeholder="Email or Username" type="text" />
        <InputField name="password" placeholder="Password" type="password" />
      </Form>
    </>
  );
};
