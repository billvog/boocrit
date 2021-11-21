import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import {
  PaginatedBookReviewsResponse,
  PaginatedBooksResponse,
} from "./generated/graphql-hooks";

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
            MyBookReviewByISBN: {
              keyArgs: ["input"],
            },
            Books: {
              keyArgs: ["options"],
              merge(
                existing: PaginatedBooksResponse | undefined,
                incoming: PaginatedBooksResponse
              ): PaginatedBooksResponse {
                console.log(existing);
                console.log(incoming);

                return {
                  ...incoming,
                  books: [
                    ...(existing?.books || []),
                    ...(incoming?.books || []),
                  ],
                };
              },
            },
            BookReviewsByISBN: {
              keyArgs: false,
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
