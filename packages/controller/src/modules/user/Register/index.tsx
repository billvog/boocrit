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

export type RegisterPhase = 1 | 2 | 3 | 4;
export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  code: string;
}

interface RegisterControllerProps {
  onFinish: () => any;
  children: (data: {
    submit: (values: RegisterFormValues) => Promise<ErrorMap | null>;
    goBack: () => void;
    phase: RegisterPhase;
  }) => JSX.Element | null;
}

export const RegisterController: React.FC<RegisterControllerProps> = ({
  children,
  onFinish,
}) => {
  const [phase, setPhase] = useState<RegisterPhase>(1);
  const [register1] = useRegisterUser1Mutation();
  const [register2] = useRegisterUser2Mutation();
  const [register4] = useRegisterUser4Mutation({
    update: async (store, { data }) => {
      if (!data?.RegisterUser4.user) return;

      await store.reset();
      store.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          Me: data?.RegisterUser4.user,
        },
      });
    },
  });

  const submit = async (values: RegisterFormValues) => {
    if (phase == 1) {
      const { data, errors } = await register1({
        variables: {
          options: {
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

      setPhase(3);
    } else if (phase == 3) {
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
    setPhase(1);
  };

  return children({
    submit,
    goBack,
    phase,
  });
};
