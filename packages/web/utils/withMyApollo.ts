import { MyApolloClient } from "@boocrit/controller";
import { withApollo } from "next-apollo";
import { ApiBaseUrl } from "../constants";
import { isServer } from "./isServer";

const createApolloClient = (ctx: any) => {
  let AuthCookie = "";
  if (isServer() && ctx) {
    AuthCookie = ctx.req.headers.cookie;
  }

  return MyApolloClient(ApiBaseUrl, AuthCookie);
};

export const withMyApollo = withApollo(createApolloClient);
