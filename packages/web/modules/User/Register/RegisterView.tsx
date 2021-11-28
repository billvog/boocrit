import {
  Register1ValidationSchema,
  Register2ValidationSchema,
  Register3ValidationSchema,
  Register4ValidationSchema,
  RegisterControllerChildrenProps,
  RegisterFormValues,
  RegisterPhase,
} from "@boocrit/controller";
import { Form, FormikProps, withFormik } from "formik";
import React from "react";
import { Header } from "../../ui/Header";
import { Phase1 } from "./Phases/Phase1";
import { Phase2 } from "./Phases/Phase2";
import { Phase3 } from "./Phases/Phase3";
import { Phase4 } from "./Phases/Phase4";

interface RegisterViewProps extends RegisterControllerChildrenProps {}
const C: React.FC<RegisterViewProps & FormikProps<RegisterFormValues>> = ({
  isSubmitting,
  goBack,
  phase,
}) => {
  return (
    <>
      <Header showLogin={false} />
      <Form className="flex justify-center">
        <div
          className="py-24 space-y-3 flex flex-col items-end"
          style={{ width: 324 }}
        >
          {phase == 1 ? (
            <Phase1 isSubmitting={isSubmitting} />
          ) : phase == 2 ? (
            <Phase2 isSubmitting={isSubmitting} onBack={goBack} />
          ) : phase == 3 ? (
            <Phase3 isSubmitting={isSubmitting} onBack={goBack} />
          ) : phase == 4 ? (
            <Phase4 isSubmitting={isSubmitting} onBack={goBack} />
          ) : null}
        </div>
      </Form>
    </>
  );
};

export const RegisterView = withFormik<RegisterViewProps, RegisterFormValues>({
  validationSchema: ({ phase }: { phase: RegisterPhase }) => {
    switch (phase) {
      case 1:
        return Register1ValidationSchema;
      case 2:
        return Register2ValidationSchema;
      case 3:
        return Register3ValidationSchema;
      case 4:
        return Register4ValidationSchema;
      default:
        return null;
    }
  },
  mapPropsToValues: ({ formInitialValues }) =>
    formInitialValues || {
      uid: "",
      firstName: "",
      lastName: "",
      email: "",
      code: "",
      password: "",
    },
  handleSubmit: async (values, { setErrors, props }) => {
    const errors = await props.submit(values);
    if (errors) setErrors(errors);
  },
})(C);
