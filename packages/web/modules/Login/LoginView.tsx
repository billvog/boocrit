import {
  ErrorMap,
  LoginFormValues,
  LoginValidationSchema,
} from "@boocrit/controller";
import { Form, FormikProps, withFormik } from "formik";
import Link from "next/link";
import React from "react";
import { Header } from "../ui/Header";
import { InputField } from "../ui/InputField";
import { MyButton } from "../ui/MyButton";
import { MyError } from "../ui/MyError";

interface LoginViewProps {
  submit: (values: LoginFormValues) => Promise<ErrorMap | null>;
}

export const C: React.FC<LoginViewProps & FormikProps<LoginFormValues>> = ({
  isSubmitting,
  errors,
}) => {
  return (
    <>
      <Header showLogin={false} />
      <Form className="flex justify-center">
        <div
          className="py-24 space-y-4 flex flex-col items-end"
          style={{ width: 300 }}
        >
          <h2 className="font-slab w-full text-center text-2xl font-bold text-secondary pb-4">
            Sign in to your account
          </h2>
          {(errors as any)._ && <MyError>{(errors as any)._}</MyError>}
          <InputField name="email" placeholder="Email" type="text" />
          <InputField name="password" placeholder="Password" type="password" />
          <MyButton isLoading={isSubmitting} type="submit">
            <span className="font-slab">Login</span>
          </MyButton>
          <div className="flex items-center font-slab text-secondary">
            don't have an account?{" "}
            <div className="ml-1 font-bold">
              <Link href="/register">register</Link>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export const LoginView = withFormik<LoginViewProps, LoginFormValues>({
  validationSchema: LoginValidationSchema,
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),
  handleSubmit: async (values, { setErrors, props }) => {
    const errors = await props.submit(values);
    if (errors) setErrors(errors);
  },
})(C);
