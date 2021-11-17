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
  avgRate: Scalars['Float'];
  categories: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  language: Scalars['String'];
  numOfRates: Scalars['Int'];
  pageCount?: Maybe<Scalars['Int']>;
  publishedDate: Scalars['String'];
  publisher: Scalars['String'];
  reviews: Array<BookReview>;
  smallThumbnail?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type BookInput = {
  isbn: Scalars['String'];
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

export type BooksInput = {
  orderBy: OrderBy;
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

export type Mutation = {
  __typename?: 'Mutation';
  CreateBookReview: BookReviewResponse;
  LoginUser: UserResponse;
  LogoutUser: OkResponse;
  RegisterUser1: OkResponse;
  RegisterUser2: OkResponse;
  RegisterUser4: UserResponse;
};


export type MutationCreateBookReviewArgs = {
  input: CreateBookReviewInput;
};


export type MutationLoginUserArgs = {
  credentials: CredentialsInput;
};


export type MutationRegisterUser1Args = {
  options: RegisterInput1;
};


export type MutationRegisterUser2Args = {
  options: RegisterInput2;
};


export type MutationRegisterUser4Args = {
  options: RegisterInput4;
};

export type OkResponse = {
  __typename?: 'OkResponse';
  ok: Scalars['Boolean'];
};

export enum OrderBy {
  CreationDate = 'creationDate',
  Rating = 'rating'
}

export type PaginatedBookReviewsResponse = {
  __typename?: 'PaginatedBookReviewsResponse';
  bookReviews?: Maybe<Array<BookReview>>;
  count?: Maybe<Scalars['Int']>;
  errors?: Maybe<Array<FieldError>>;
  hasMore?: Maybe<Scalars['Boolean']>;
};

export type PaginatedBooksResponse = {
  __typename?: 'PaginatedBooksResponse';
  books?: Maybe<Array<Book>>;
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
  Book?: Maybe<Book>;
  BookReviewsByISBN: PaginatedBookReviewsResponse;
  Books: PaginatedBooksResponse;
  Me?: Maybe<User>;
  hello: Scalars['String'];
};


export type QueryBookArgs = {
  options: BookInput;
};


export type QueryBookReviewsByIsbnArgs = {
  input: BookReviewsByIsbnInput;
  pagination: PaginationInput;
};


export type QueryBooksArgs = {
  options: BooksInput;
  pagination: PaginationInput;
};

export type RegisterInput1 = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  uid: Scalars['String'];
};

export type RegisterInput2 = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type RegisterInput4 = {
  code: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  uid: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  profileImage: Scalars['String'];
  reviews: Array<BookReview>;
  uid: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type BookFragment = { __typename?: 'Book', id: string, title: string, description?: string | null | undefined, publisher: string, language: string, pageCount?: number | null | undefined, publishedDate: string, categories: Array<string>, smallThumbnail?: string | null | undefined, thumbnail?: string | null | undefined, avgRate: number, numOfRates: number, createdAt: any };

export type BookReviewFragment = { __typename?: 'BookReview', id: string, revieweeId: string, bookId: string, rate: number, body: string, createdAt: any, reviewee: { __typename?: 'User', id: string, uid: string, fullName: string, firstName: string, lastName: string, email: string, profileImage: string } };

export type BookReviewResponseFragment = { __typename?: 'BookReviewResponse', errors?: Array<{ __typename?: 'FieldError', path: string, message: string }> | null | undefined, bookReview?: { __typename?: 'BookReview', id: string, revieweeId: string, bookId: string, rate: number, body: string, createdAt: any, reviewee: { __typename?: 'User', id: string, uid: string, fullName: string, firstName: string, lastName: string, email: string, profileImage: string } } | null | undefined };

export type FieldErrorFragment = { __typename?: 'FieldError', path: string, message: string };

export type OkResponseFragment = { __typename?: 'OkResponse', ok: boolean };

export type PaginatedBookReviewsResponseFragment = { __typename?: 'PaginatedBookReviewsResponse', hasMore?: boolean | null | undefined, count?: number | null | undefined, errors?: Array<{ __typename?: 'FieldError', path: string, message: string }> | null | undefined, bookReviews?: Array<{ __typename?: 'BookReview', id: string, revieweeId: string, bookId: string, rate: number, body: string, createdAt: any, reviewee: { __typename?: 'User', id: string, uid: string, fullName: string, firstName: string, lastName: string, email: string, profileImage: string } }> | null | undefined };

export type PaginatedBooksResponseFragment = { __typename?: 'PaginatedBooksResponse', hasMore?: boolean | null | undefined, count?: number | null | undefined, errors?: Array<{ __typename?: 'FieldError', path: string, message: string }> | null | undefined, books?: Array<{ __typename?: 'Book', id: string, title: string, description?: string | null | undefined, publisher: string, language: string, pageCount?: number | null | undefined, publishedDate: string, categories: Array<string>, smallThumbnail?: string | null | undefined, thumbnail?: string | null | undefined, avgRate: number, numOfRates: number, createdAt: any }> | null | undefined };

export type UserFragment = { __typename?: 'User', id: string, uid: string, fullName: string, firstName: string, lastName: string, email: string, profileImage: string };

export type UserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', path: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: string, uid: string, fullName: string, firstName: string, lastName: string, email: string, profileImage: string } | null | undefined };

export type CreateBookReviewMutationVariables = Exact<{
  input: CreateBookReviewInput;
}>;


export type CreateBookReviewMutation = { __typename?: 'Mutation', CreateBookReview: { __typename?: 'BookReviewResponse', errors?: Array<{ __typename?: 'FieldError', path: string, message: string }> | null | undefined, bookReview?: { __typename?: 'BookReview', id: string, revieweeId: string, bookId: string, rate: number, body: string, createdAt: any, reviewee: { __typename?: 'User', id: string, uid: string, fullName: string, firstName: string, lastName: string, email: string, profileImage: string } } | null | undefined } };

export type LoginUserMutationVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', LoginUser: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', path: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: string, uid: string, fullName: string, firstName: string, lastName: string, email: string, profileImage: string } | null | undefined } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', LogoutUser: { __typename?: 'OkResponse', ok: boolean } };

export type RegisterUser1MutationVariables = Exact<{
  options: RegisterInput1;
}>;


export type RegisterUser1Mutation = { __typename?: 'Mutation', RegisterUser1: { __typename?: 'OkResponse', ok: boolean } };

export type RegisterUser2MutationVariables = Exact<{
  options: RegisterInput2;
}>;


export type RegisterUser2Mutation = { __typename?: 'Mutation', RegisterUser2: { __typename?: 'OkResponse', ok: boolean } };

export type RegisterUser4MutationVariables = Exact<{
  options: RegisterInput4;
}>;


export type RegisterUser4Mutation = { __typename?: 'Mutation', RegisterUser4: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', path: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: string, uid: string, fullName: string, firstName: string, lastName: string, email: string, profileImage: string } | null | undefined } };

export type BookQueryVariables = Exact<{
  options: BookInput;
}>;


export type BookQuery = { __typename?: 'Query', Book?: { __typename?: 'Book', id: string, title: string, description?: string | null | undefined, publisher: string, language: string, pageCount?: number | null | undefined, publishedDate: string, categories: Array<string>, smallThumbnail?: string | null | undefined, thumbnail?: string | null | undefined, avgRate: number, numOfRates: number, createdAt: any } | null | undefined };

export type BooksQueryVariables = Exact<{
  pagination: PaginationInput;
  options: BooksInput;
}>;


export type BooksQuery = { __typename?: 'Query', Books: { __typename?: 'PaginatedBooksResponse', hasMore?: boolean | null | undefined, count?: number | null | undefined, errors?: Array<{ __typename?: 'FieldError', path: string, message: string }> | null | undefined, books?: Array<{ __typename?: 'Book', id: string, title: string, description?: string | null | undefined, publisher: string, language: string, pageCount?: number | null | undefined, publishedDate: string, categories: Array<string>, smallThumbnail?: string | null | undefined, thumbnail?: string | null | undefined, avgRate: number, numOfRates: number, createdAt: any }> | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', Me?: { __typename?: 'User', id: string, uid: string, fullName: string, firstName: string, lastName: string, email: string, profileImage: string } | null | undefined };

export const FieldErrorFragmentDoc = gql`
    fragment FieldError on FieldError {
  path
  message
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  uid
  fullName
  firstName
  lastName
  email
  profileImage
}
    `;
export const BookReviewFragmentDoc = gql`
    fragment BookReview on BookReview {
  id
  revieweeId
  reviewee {
    ...User
  }
  bookId
  rate
  body
  createdAt
}
    ${UserFragmentDoc}`;
export const BookReviewResponseFragmentDoc = gql`
    fragment BookReviewResponse on BookReviewResponse {
  errors {
    ...FieldError
  }
  bookReview {
    ...BookReview
  }
}
    ${FieldErrorFragmentDoc}
${BookReviewFragmentDoc}`;
export const OkResponseFragmentDoc = gql`
    fragment OkResponse on OkResponse {
  ok
}
    `;
export const PaginatedBookReviewsResponseFragmentDoc = gql`
    fragment PaginatedBookReviewsResponse on PaginatedBookReviewsResponse {
  errors {
    ...FieldError
  }
  bookReviews {
    ...BookReview
  }
  hasMore
  count
}
    ${FieldErrorFragmentDoc}
${BookReviewFragmentDoc}`;
export const BookFragmentDoc = gql`
    fragment Book on Book {
  id
  title
  description
  publisher
  language
  pageCount
  publishedDate
  categories
  smallThumbnail
  thumbnail
  avgRate
  numOfRates
  createdAt
}
    `;
export const PaginatedBooksResponseFragmentDoc = gql`
    fragment PaginatedBooksResponse on PaginatedBooksResponse {
  errors {
    ...FieldError
  }
  books {
    ...Book
  }
  hasMore
  count
}
    ${FieldErrorFragmentDoc}
${BookFragmentDoc}`;
export const UserResponseFragmentDoc = gql`
    fragment UserResponse on UserResponse {
  errors {
    ...FieldError
  }
  user {
    ...User
  }
}
    ${FieldErrorFragmentDoc}
${UserFragmentDoc}`;
export const CreateBookReviewDocument = gql`
    mutation CreateBookReview($input: CreateBookReviewInput!) {
  CreateBookReview(input: $input) {
    ...BookReviewResponse
  }
}
    ${BookReviewResponseFragmentDoc}`;
export type CreateBookReviewMutationFn = Apollo.MutationFunction<CreateBookReviewMutation, CreateBookReviewMutationVariables>;

/**
 * __useCreateBookReviewMutation__
 *
 * To run a mutation, you first call `useCreateBookReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookReviewMutation, { data, loading, error }] = useCreateBookReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookReviewMutation, CreateBookReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookReviewMutation, CreateBookReviewMutationVariables>(CreateBookReviewDocument, options);
      }
export type CreateBookReviewMutationHookResult = ReturnType<typeof useCreateBookReviewMutation>;
export type CreateBookReviewMutationResult = Apollo.MutationResult<CreateBookReviewMutation>;
export type CreateBookReviewMutationOptions = Apollo.BaseMutationOptions<CreateBookReviewMutation, CreateBookReviewMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($credentials: CredentialsInput!) {
  LoginUser(credentials: $credentials) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  LogoutUser {
    ...OkResponse
  }
}
    ${OkResponseFragmentDoc}`;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const RegisterUser1Document = gql`
    mutation RegisterUser1($options: RegisterInput1!) {
  RegisterUser1(options: $options) {
    ...OkResponse
  }
}
    ${OkResponseFragmentDoc}`;
export type RegisterUser1MutationFn = Apollo.MutationFunction<RegisterUser1Mutation, RegisterUser1MutationVariables>;

/**
 * __useRegisterUser1Mutation__
 *
 * To run a mutation, you first call `useRegisterUser1Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUser1Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUser1Mutation, { data, loading, error }] = useRegisterUser1Mutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterUser1Mutation(baseOptions?: Apollo.MutationHookOptions<RegisterUser1Mutation, RegisterUser1MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUser1Mutation, RegisterUser1MutationVariables>(RegisterUser1Document, options);
      }
export type RegisterUser1MutationHookResult = ReturnType<typeof useRegisterUser1Mutation>;
export type RegisterUser1MutationResult = Apollo.MutationResult<RegisterUser1Mutation>;
export type RegisterUser1MutationOptions = Apollo.BaseMutationOptions<RegisterUser1Mutation, RegisterUser1MutationVariables>;
export const RegisterUser2Document = gql`
    mutation RegisterUser2($options: RegisterInput2!) {
  RegisterUser2(options: $options) {
    ...OkResponse
  }
}
    ${OkResponseFragmentDoc}`;
export type RegisterUser2MutationFn = Apollo.MutationFunction<RegisterUser2Mutation, RegisterUser2MutationVariables>;

/**
 * __useRegisterUser2Mutation__
 *
 * To run a mutation, you first call `useRegisterUser2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUser2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUser2Mutation, { data, loading, error }] = useRegisterUser2Mutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterUser2Mutation(baseOptions?: Apollo.MutationHookOptions<RegisterUser2Mutation, RegisterUser2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUser2Mutation, RegisterUser2MutationVariables>(RegisterUser2Document, options);
      }
export type RegisterUser2MutationHookResult = ReturnType<typeof useRegisterUser2Mutation>;
export type RegisterUser2MutationResult = Apollo.MutationResult<RegisterUser2Mutation>;
export type RegisterUser2MutationOptions = Apollo.BaseMutationOptions<RegisterUser2Mutation, RegisterUser2MutationVariables>;
export const RegisterUser4Document = gql`
    mutation RegisterUser4($options: RegisterInput4!) {
  RegisterUser4(options: $options) {
    ...UserResponse
  }
}
    ${UserResponseFragmentDoc}`;
export type RegisterUser4MutationFn = Apollo.MutationFunction<RegisterUser4Mutation, RegisterUser4MutationVariables>;

/**
 * __useRegisterUser4Mutation__
 *
 * To run a mutation, you first call `useRegisterUser4Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUser4Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUser4Mutation, { data, loading, error }] = useRegisterUser4Mutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterUser4Mutation(baseOptions?: Apollo.MutationHookOptions<RegisterUser4Mutation, RegisterUser4MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUser4Mutation, RegisterUser4MutationVariables>(RegisterUser4Document, options);
      }
export type RegisterUser4MutationHookResult = ReturnType<typeof useRegisterUser4Mutation>;
export type RegisterUser4MutationResult = Apollo.MutationResult<RegisterUser4Mutation>;
export type RegisterUser4MutationOptions = Apollo.BaseMutationOptions<RegisterUser4Mutation, RegisterUser4MutationVariables>;
export const BookDocument = gql`
    query Book($options: BookInput!) {
  Book(options: $options) {
    ...Book
  }
}
    ${BookFragmentDoc}`;

/**
 * __useBookQuery__
 *
 * To run a query within a React component, call `useBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useBookQuery(baseOptions: Apollo.QueryHookOptions<BookQuery, BookQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookQuery, BookQueryVariables>(BookDocument, options);
      }
export function useBookLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookQuery, BookQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookQuery, BookQueryVariables>(BookDocument, options);
        }
export type BookQueryHookResult = ReturnType<typeof useBookQuery>;
export type BookLazyQueryHookResult = ReturnType<typeof useBookLazyQuery>;
export type BookQueryResult = Apollo.QueryResult<BookQuery, BookQueryVariables>;
export const BooksDocument = gql`
    query Books($pagination: PaginationInput!, $options: BooksInput!) {
  Books(pagination: $pagination, options: $options) {
    ...PaginatedBooksResponse
  }
}
    ${PaginatedBooksResponseFragmentDoc}`;

/**
 * __useBooksQuery__
 *
 * To run a query within a React component, call `useBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBooksQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useBooksQuery(baseOptions: Apollo.QueryHookOptions<BooksQuery, BooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BooksQuery, BooksQueryVariables>(BooksDocument, options);
      }
export function useBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BooksQuery, BooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BooksQuery, BooksQueryVariables>(BooksDocument, options);
        }
export type BooksQueryHookResult = ReturnType<typeof useBooksQuery>;
export type BooksLazyQueryHookResult = ReturnType<typeof useBooksLazyQuery>;
export type BooksQueryResult = Apollo.QueryResult<BooksQuery, BooksQueryVariables>;
export const MeDocument = gql`
    query Me {
  Me {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;