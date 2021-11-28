import { BookFragment, useGetBookCover } from "@boocrit/controller";
import router from "next/router";
import React from "react";
import { RatingView } from "react-simple-star-rating";

interface BookProps {
  book: BookFragment;
  onClick?: () => any;
  clickable?: boolean;
}

export const Book: React.FC<BookProps> = ({
  book,
  onClick,
  clickable = true,
}) => {
  const openBook = () => router.push(`/book/${book.id}`);
  const bookClicked = clickable
    ? typeof onClick === "function"
      ? onClick
      : openBook
    : () => {};

  const searchAuthor = (a: string) => {
    router.push(`/search?q=${a}`);
  };

  return (
    <div className="bg-accent rounded-3xl p-3.5 pr-6 flex space-x-3.5">
      <div>
        <img
          src={useGetBookCover(book)}
          style={{ width: 64 }}
          className={`rounded-xl ${clickable ? "cursor-pointer" : ""}`}
          onClick={bookClicked}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="leading-tight">
          <div
            className={`font-black text-2xl text-secondary ${
              clickable
                ? "hover:text-secondary-hover hover:underline cursor-pointer"
                : ""
            }`}
            onClick={bookClicked}
          >
            {book.title}
          </div>
          <div className="text-accent-darkest text-sm">
            from{" "}
            {book.authors.length > 0 ? (
              book.authors
                .map<React.ReactNode>((a) => (
                  <b
                    className="hover:underline cursor-pointer"
                    onClick={() => searchAuthor(a)}
                  >
                    {a}
                  </b>
                ))
                .reduce((p, c) => [p, ", ", c])
            ) : (
              <b>Unknown</b>
            )}
          </div>
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <RatingView ratingValue={book.avgRate} stars={5} size={20} />
          <div
            className="text-sm text-accent-darkest font-bold flex items-center space-x-2"
            style={{ transform: "translateY(-3px)" }}
          >
            <span>{book.avgRate == -1 ? "-" : book.avgRate} / 5</span>
            {book.avgRate != -1 && (
              <span className="text-xs">
                ({book.numOfRates.toLocaleString()} votes)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
