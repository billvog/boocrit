import React from "react";
import { toErrorMap } from "../../../utils/toErrorMap";
import {
  MeDocument,
  MeQuery,
  useLoginUserMutation,
} from "../../../generated/graphql-hooks";
import { ErrorMap } from "../../../types/ErrorMap";

export interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginControllerProps {
  onFinish: () => any;
  children: (data: {
    submit: (values: LoginFormValues) => Promise<ErrorMap | null>;
  }) => JSX.Element | null;
}

export const LoginController: React.FC<LoginControllerProps> = ({
  children,
  onFinish,
}) => {
  const [login] = useLoginUserMutation({
    update: async (store, { data }) => {
      if (!data?.LoginUser.user) return;

      await store.reset();
      store.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          Me: data?.LoginUser.user,
        },
      });
    },
  });

  const submit = async (values: LoginFormValues) => {
    const { data, errors } = await login({
      variables: {
        credentials: values,
      },
      errorPolicy: "all",
    });

    if (errors) {
      return toErrorMap(errors as any);
    } else if (data?.LoginUser.errors) {
      return toErrorMap(data.LoginUser.errors);
    }

    onFinish();
    return null;
  };

  return children({
    submit,
  });
};
