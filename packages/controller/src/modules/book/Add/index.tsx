import React, { useState } from "react";
import { useEffect } from "react";
import {
  BookFragment,
  useBooksFromApiLazyQuery,
} from "../../../generated/graphql-hooks";
import { ErrorMap } from "../../../types/ErrorMap";

export type AddBookPhase = 1 | 2;
export interface AddBookFormValues {
  query: string;
}

export interface AddBookControllerChildrenProps {
  submit: (values: AddBookFormValues) => Promise<ErrorMap | null>;
  chooseBook: (bookId: string) => void;
  goBack: () => void;
  phase: AddBookPhase;
  books: {
    queryCalled: boolean;
    loading: boolean;
    data?: BookFragment[];
  };
}

interface AddBookControllerProps {
  children: (data: AddBookControllerChildrenProps) => JSX.Element | null;
}

export const AddBookController: React.FC<AddBookControllerProps> = ({
  children,
}) => {
  const [phase, setPhase] = useState<AddBookPhase>(1);
  const [book, setBook] = useState<BookFragment | undefined>();

  const [
    searchBooks,
    { called: BooksQueryCalled, data: BooksData, loading: BooksLoading },
  ] = useBooksFromApiLazyQuery();

  const submit = async (values: AddBookFormValues) => {
    if (phase === 1) {
      searchBooks({ variables: { options: { query: values.query } } });
      return null;
    }

    return null;
  };

  const chooseBook = (bookId: string) => {
    setBook(BooksData?.BooksFromAPI.books?.find((b) => (b.id = bookId)));
  };

  const goBack = () => {
    setBook(undefined);
  };

  useEffect(() => {
    if (book) {
      setPhase(2);
    } else {
      setPhase(1);
    }
  }, [book]);

  return children({
    submit,
    chooseBook,
    goBack,
    phase,
    books: {
      queryCalled: BooksQueryCalled,
      loading: BooksLoading,
      data: BooksData?.BooksFromAPI.books as BookFragment[],
    },
  });
};
