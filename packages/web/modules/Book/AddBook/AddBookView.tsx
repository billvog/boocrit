import { AddBookControllerChildrenProps } from "@boocrit/controller";
import { Form, Formik } from "formik";
import React from "react";
import { Book } from "../../ui/Book";
import { InputField } from "../../ui/InputField";
import { MyButton } from "../../ui/MyButton";
import { MySpinner } from "../../ui/MySpinner";

interface AddBookViewProps extends AddBookControllerChildrenProps {}
export const AddBookView: React.FC<AddBookViewProps> = ({ submit, books }) => {
  return (
    <div className="body-container">
      <div className="flex justify-center w-full mt-3">
        <Formik
          initialValues={{ query: "" }}
          onSubmit={(values) => {
            if (!values.query.trim()) return;
            return submit(values);
          }}
        >
          {() => (
            <Form
              className="flex items-center space-x-4"
              style={{ width: 580 }}
            >
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
      </div>
      <div className="mt-10">
        {!books.queryCalled ? (
          <div className="font-slab font-bold text-lg text-secondary w-full text-center">
            Search books from third-parties by title, author, subject or better
            isbn and add the on Boocrit.
          </div>
        ) : books.loading ? (
          <MySpinner />
        ) : (
          <>
            {books.data?.length == 0 ? (
              <div className="font-slab font-bold text-lg text-secondary w-full text-center">
                Nothing found based on the given terms.
              </div>
            ) : (
              <div className="space-y-4">
                {books.data?.map((book) => (
                  <div
                    key={`add:search-result:${book.id}-${book.title}`}
                    className={book.id === "-" ? "opacity-60" : "opacity-100"}
                  >
                    <Book
                      book={book}
                      clickable={book.id !== "-"}
                      onClick={() => {}}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
