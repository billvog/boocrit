import React from "react";
import { toErrorMap } from "../../../utils/toErrorMap";
import {
  MeDocument,
  MeQuery,
  useRegisterUser1Mutation,
  useRegisterUser2Mutation,
  useRegisterUser4Mutation,
} from "../../../generated/graphql-hooks";
import { ErrorMap } from "../../../types/ErrorMap";
import { useState } from "react";
import { useEffect } from "react";
import { LOCALSTORAGE_REGISTER_STATE_KEY } from "../../../constants";

export interface SavedRegisterState {
  phase: RegisterPhase;
  formValues: RegisterFormValues;
}

export type RegisterPhase = 1 | 2 | 3 | 4;
export interface RegisterFormValues {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  code: string;
}

interface RegisterControllerProps {
  onFinish: () => any;
  children: (data: {
    isLoading: boolean;
    submit: (values: RegisterFormValues) => Promise<ErrorMap | null>;
    goBack: () => void;
    phase: RegisterPhase;
    formInitialValues: RegisterFormValues | undefined;
  }) => JSX.Element | null;
}

export const RegisterController: React.FC<RegisterControllerProps> = ({
  children,
  onFinish,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [phase, setPhase] = useState<RegisterPhase>(1);
  const [formInitialValues, setFormInitialValues] =
    useState<RegisterFormValues>();

  const [register1] = useRegisterUser1Mutation();
  const [register2] = useRegisterUser2Mutation();
  const [register4] = useRegisterUser4Mutation({
    update: async (store, { data }) => {
      if (!data?.RegisterUser4.user) return;

      clearRegisterState();

      await store.reset();
      store.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          Me: data?.RegisterUser4.user,
        },
      });
    },
  });

  useEffect(() => {
    try {
      const registerState = JSON.parse(
        localStorage.getItem(LOCALSTORAGE_REGISTER_STATE_KEY) || ""
      ) as SavedRegisterState;

      setPhase(registerState.phase);
      setFormInitialValues(registerState.formValues);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }, []);

  const clearRegisterState = () => {
    localStorage.removeItem(LOCALSTORAGE_REGISTER_STATE_KEY);
  };

  const saveRegisterState = (values: RegisterFormValues) => {
    const registerState: SavedRegisterState = {
      phase: (phase + 1) as RegisterPhase,
      formValues: values,
    };

    localStorage.setItem(
      LOCALSTORAGE_REGISTER_STATE_KEY,
      JSON.stringify(registerState)
    );
  };

  const submit = async (values: RegisterFormValues) => {
    if (phase == 1) {
      const { data, errors } = await register1({
        variables: {
          options: {
            uid: values.uid,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
          },
        },
        errorPolicy: "all",
      });

      if (errors) {
        return toErrorMap(errors as any);
      } else if (!data?.RegisterUser1.ok) {
        return {
          _: "Something went wrong",
        };
      }

      saveRegisterState(values);
      setPhase(2);
    } else if (phase == 2) {
      const { data, errors } = await register2({
        variables: {
          options: {
            code: values.code,
            email: values.email,
          },
        },
        errorPolicy: "all",
      });

      if (errors) {
        return toErrorMap(errors as any);
      } else if (!data?.RegisterUser2.ok) {
        return {
          code: "Invalid code given",
        };
      }

      saveRegisterState(values);
      setPhase(3);
    } else if (phase == 3) {
      saveRegisterState(values);
      setPhase(4);
    } else if (phase == 4) {
      const { data, errors } = await register4({
        variables: {
          options: {
            ...values,
          },
        },
        errorPolicy: "all",
      });

      if (errors) {
        return toErrorMap(errors as any);
      } else if (data?.RegisterUser4.errors) {
        return toErrorMap(data.RegisterUser4.errors);
      }

      onFinish();
    }

    return null;
  };

  const goBack = () => {
    clearRegisterState();
    setPhase(1);
  };

  return children({
    isLoading,
    submit,
    goBack,
    phase,
    formInitialValues,
  });
};
