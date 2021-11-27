import {
  AddBookFormValues,
  AddBookPhase,
  BookFragment,
  ErrorMap,
} from "@boocrit/controller";
import { Form, Formik } from "formik";
import React from "react";
import { Book } from "../../ui/Book";
import { InputField } from "../../ui/InputField";
import { MyButton } from "../../ui/MyButton";

interface AddBookViewProps {
  submit: (values: AddBookFormValues) => Promise<ErrorMap | null>;
  chooseBook: (bookId: string) => void;
  goBack: () => void;
  phase: AddBookPhase;
  books: {
    loading: boolean;
    data?: BookFragment[];
  };
}

export const AddBookView: React.FC<AddBookViewProps> = ({ submit, books }) => {
  return (
    <div className="body-container">
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values) => {
          if (!values.query.trim()) return;
          return submit(values);
        }}
      >
        {() => (
          <Form className="flex items-center space-x-4" style={{ width: 580 }}>
            <InputField
              name="query"
              placeholder="Search isbn, title, author, publisher or whatever"
              type="text"
            />
            <MyButton
              size="big"
              color="brown"
              isLoading={books.loading}
              type="submit"
            >
              <span className="font-slab">Search</span>
            </MyButton>
          </Form>
        )}
      </Formik>
      <div className="space-y-2 mt-6">
        {books.data?.map((b) => (
          <Book book={b} />
        ))}
      </div>
    </div>
  );
};
