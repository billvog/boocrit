import { OrderBy, useBooksLazyQuery } from "@boocrit/controller";
import { Form, Formik } from "formik";
import router from "next/router";
import React from "react";
import { Book } from "../ui/Book";
import { InputField } from "../ui/InputField";
import { MyButton } from "../ui/MyButton";
import { MySpinner } from "../ui/MySpinner";

interface SearchControllerProps {}
export const SearchController: React.FC<SearchControllerProps> = ({}) => {
  const [
    RunBooksQuery,
    {
      called: BooksQueryCalled,
      data: BooksData,
      loading: BooksLoading,
      variables: BooksQueryVariables,
      fetchMore: FetchMoreBooks,
    },
  ] = useBooksLazyQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      pagination: { limit: 8 },
      options: { orderBy: OrderBy.Rating },
    },
  });

  const openAddBookEntry = () => {
    router.push("/book/add");
  };

  return (
    <div className="body-container">
      <div className="flex justify-center w-full mt-3">
        <Formik
          initialValues={{ query: "" }}
          onSubmit={({ query }) => {
            if (!query.trim()) return;
            RunBooksQuery({
              variables: {
                ...BooksQueryVariables!,
                options: { orderBy: OrderBy.Rating, query },
              },
            });
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
                isLoading={BooksLoading}
                type="submit"
              >
                <span className="font-slab">Search</span>
              </MyButton>
            </Form>
          )}
        </Formik>
      </div>
      <div className="mt-10">
        {!BooksQueryCalled ? (
          <div className="font-slab font-bold text-lg text-secondary w-full text-center">
            Search for books. If you can't find what you want,{" "}
            <span
              className="font-black underline cursor-pointer"
              onClick={openAddBookEntry}
            >
              add a new entry
            </span>
            .
          </div>
        ) : BooksLoading && !BooksData ? (
          <MySpinner />
        ) : (
          <>
            {BooksData?.Books.books?.length == 0 ? (
              <div className="font-slab font-bold text-lg text-secondary w-full text-center">
                Nothing found based on the given terms. Maybe you want to{" "}
                <span
                  className="font-black underline cursor-pointer"
                  onClick={openAddBookEntry}
                >
                  add a new entry
                </span>
                ?
              </div>
            ) : (
              <div className="space-y-4">
                {BooksData?.Books.books?.map((book) => (
                  <div key={`search-result:${book.id}`}>
                    <Book book={book} />
                  </div>
                ))}
                {BooksData?.Books.hasMore && (
                  <div className="w-full flex justify-center">
                    <MyButton
                      isLoading={BooksLoading}
                      onClick={() => {
                        FetchMoreBooks!({
                          variables: {
                            ...BooksQueryVariables,
                            pagination: {
                              ...BooksQueryVariables?.pagination,
                              skip: BooksData.Books.books?.length,
                            },
                          },
                        });
                      }}
                    >
                      Load more
                    </MyButton>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
