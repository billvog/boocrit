import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Book = {
  __typename?: 'Book';
  authors: Array<Scalars['String']>;
  categories: Array<Scalars['String']>;
  description: Scalars['String'];
  imageLinks?: Maybe<ImageListType>;
  industryIdentifiers: Array<IndustryIdentifiersType>;
  infoLink: Scalars['String'];
  language: Scalars['String'];
  pageCount: Scalars['Float'];
  previewLink: Scalars['String'];
  publishedDate: Scalars['String'];
  publisher: Scalars['String'];
  title: Scalars['String'];
};

export type BookReview = {
  __typename?: 'BookReview';
  body: Scalars['String'];
  book: Book;
  bookId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  rate: Scalars['Float'];
  reviewee: User;
  revieweeId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type BookReviewResponse = {
  __typename?: 'BookReviewResponse';
  bookReview?: Maybe<BookReview>;
  errors?: Maybe<Array<FieldError>>;
};

export type BookReviewsByIsbnInput = {
  isbn: Scalars['String'];
};

export type CreateBookReviewInput = {
  body: Scalars['String'];
  bookId: Scalars['String'];
  rate: Scalars['Float'];
};

export type CredentialsInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type ImageListType = {
  __typename?: 'ImageListType';
  smallThumbnail: Scalars['String'];
  thumbnail: Scalars['String'];
};

export type IndustryIdentifiersType = {
  __typename?: 'IndustryIdentifiersType';
  identifier: Scalars['String'];
  type: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateBookReview: BookReviewResponse;
  LoginUser: UserResponse;
  LogoutUser: OkResponse;
  RegisterUser: UserResponse;
};


export type MutationCreateBookReviewArgs = {
  input: CreateBookReviewInput;
};


export type MutationLoginUserArgs = {
  credentials: CredentialsInput;
};


export type MutationRegisterUserArgs = {
  options: RegisterInput;
};

export type OkResponse = {
  __typename?: 'OkResponse';
  ok: Scalars['Boolean'];
};

export type PaginatedBookReviewsResponse = {
  __typename?: 'PaginatedBookReviewsResponse';
  bookReviews?: Maybe<Array<BookReview>>;
  count?: Maybe<Scalars['Int']>;
  errors?: Maybe<Array<FieldError>>;
  hasMore?: Maybe<Scalars['Boolean']>;
};

export type PaginationInput = {
  limit: Scalars['Int'];
  skip?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  BookReviewsByISBN: PaginatedBookReviewsResponse;
  Me: User;
  hello: Scalars['String'];
};


export type QueryBookReviewsByIsbnArgs = {
  input: BookReviewsByIsbnInput;
  pagination: PaginationInput;
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  reviews: Array<BookReview>;
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };


export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;