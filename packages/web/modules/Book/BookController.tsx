import {
  BookFragment,
  useBookReviewsByIsbnQuery,
  useGetBookCover,
  useMyBookReviewByIsbnQuery,
} from "@boocrit/controller";
import React from "react";
import { RatingView } from "react-simple-star-rating";
import { BookReview } from "../ui/BookReview";
import { MyButton } from "../ui/MyButton";
import { MySpinner } from "../ui/MySpinner";

interface BookControllerProps {
  book: BookFragment;
}

export const BookController: React.FC<BookControllerProps> = ({ book }) => {
  const {
    data: ReviewsData,
    loading: ReviewsLoading,
    fetchMore: FetchMoreReviews,
    variables: ReviewsQueryVariables,
  } = useBookReviewsByIsbnQuery({
    notifyOnNetworkStatusChange: true,
    variables: { input: { isbn: book.id }, pagination: { limit: 5 } },
  });

  const { data: MyReviewData, loading: MyReviewLoading } =
    useMyBookReviewByIsbnQuery({
      variables: { input: { isbn: book.id } },
    });

  return (
    <div className="body-container space-y-4">
      <div className="font-slab text-3xl text-secondary">
        <span className="font-black underline">{book.title}</span> on Boocrit
      </div>
      <div className="flex space-x-4">
        <div>
          <img
            src={useGetBookCover(book)}
            className="rounded-3xl"
            style={{ width: 118 }}
          />
        </div>
        <div>
          <div className="text-brown">
            Written by{" "}
            <span className="font-bold underline">
              {book.authors.join(", ")}
            </span>
          </div>
          <div className="text-brown">
            Published by{" "}
            <span className="font-bold underline">{book.publisher}</span> on{" "}
            <span className="font-bold underline">{book.publishedDate}</span>
          </div>
          {book.pageCount && (
            <div>
              <span className="text-gray-700 font-medium">Pages:</span>{" "}
              <span className="text-brown font-bold">{book.pageCount}</span>
            </div>
          )}
          <div className="text-gray-700 font-medium">
            Catergories:{" "}
            {book.categories
              .map<React.ReactNode>((c) => (
                <span className="text-brown font-bold hover:underline cursor-pointer">
                  {c}
                </span>
              ))
              .reduce((p, c) => [p, ", ", c])}
          </div>
          <div className="mt-1 flex">
            <RatingView ratingValue={book.avgRate} size={24} />
            <div
              className="ml-2 text-gray-500"
              style={{ transform: "translateY(1.5px)" }}
            >
              <span>
                <b>{book.avgRate}</b> / <b>5</b>
              </span>
              <span className="text-sm ml-2">
                ({book.numOfRates.toLocaleString()} votes)
              </span>
            </div>
          </div>
        </div>
      </div>
      {!!book.description && (
        <div>
          <div className="font-slab font-bold text-2xl text-brown">
            About it
          </div>
          <div className="text-secondary font-medium">{book.description}</div>
        </div>
      )}
      <div>
        {(ReviewsLoading && !ReviewsData) || MyReviewLoading ? (
          <MySpinner />
        ) : (
          <>
            {MyReviewData?.MyBookReviewByISBN.bookReview ? (
              <div className="mb-4">
                <div className="font-slab font-bold text-2xl text-brown mb-2">
                  Your review
                </div>
                <BookReview
                  bookReview={MyReviewData?.MyBookReviewByISBN.bookReview}
                />
              </div>
            ) : (
              <div>you haven't reviewed</div>
            )}
            <div className="font-slab text-2xl text-brown">
              <span className="font-black">
                {ReviewsData?.BookReviewsByISBN.count}
              </span>{" "}
              reviews
            </div>
            <div className="mt-2">
              {ReviewsData?.BookReviewsByISBN.bookReviews?.length == 0 ? (
                <div>
                  <div className="font-slab font-bold text-lg text-secondary">
                    There are not reviews for this book
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {ReviewsData?.BookReviewsByISBN.bookReviews?.map((review) => (
                    <div key={`${review.id}:${review.bookId}`}>
                      <BookReview bookReview={review} />
                    </div>
                  ))}
                  {ReviewsData?.BookReviewsByISBN.hasMore && (
                    <div>
                      <MyButton
                        isLoading={ReviewsLoading}
                        onClick={() => {
                          FetchMoreReviews({
                            variables: {
                              ...ReviewsQueryVariables,
                              pagination: {
                                ...ReviewsQueryVariables?.pagination,
                                skip: ReviewsData.BookReviewsByISBN.bookReviews
                                  ?.length,
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};
