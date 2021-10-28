import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const MyApolloClient = (ApiBaseUrl: string, AuthCookie: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: ApiBaseUrl,
      credentials: "include",
    }),
    headers: {
      cookie: AuthCookie,
    },
    cache: new InMemoryCache(),
  });
};
