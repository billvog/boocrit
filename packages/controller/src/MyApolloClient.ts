import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { PaginatedBookReviewsResponse } from "src";

export const MyApolloClient = (ApiBaseUrl: string, AuthCookie: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: ApiBaseUrl,
      credentials: "include",
    }),
    headers: {
      cookie: AuthCookie,
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            BookReviewsByISBN: {
              keyArgs: ["input", "pagination"],
              merge(
                existing: PaginatedBookReviewsResponse | undefined,
                incoming: PaginatedBookReviewsResponse
              ): PaginatedBookReviewsResponse {
                return {
                  ...incoming,
                  bookReviews: [
                    ...(existing?.bookReviews || []),
                    ...(incoming?.bookReviews || []),
                  ],
                };
              },
            },
          },
        },
      },
    }),
  });
};
