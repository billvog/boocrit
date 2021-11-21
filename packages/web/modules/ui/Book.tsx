import { BookFragment } from "@boocrit/controller";
import router from "next/router";
import React from "react";
import { RatingView } from "react-simple-star-rating";

interface BookProps {
  book: BookFragment;
}

export const Book: React.FC<BookProps> = ({ book }) => {
  const openBook = () => {
    router.push(`/book/${book.id}`);
  };

  return (
    <div className="bg-accent group rounded-3xl p-3.5 pr-6 flex space-x-3.5">
      <div>
        <img
          src={book.thumbnail || book.smallThumbnail || ""}
          style={{ width: 64 }}
          className="rounded-xl cursor-pointer"
          onClick={openBook}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="leading-tight">
          <div
            className="text-2xl text-secondary group-hover:text-secondary-hover font-black cursor-pointer"
            onClick={openBook}
          >
            {book.title}
          </div>
          <div className="text-accent-darkest text-sm">
            from <span className="font-bold">{book.authors.join(", ")}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <RatingView ratingValue={book.avgRate} stars={5} size={20} />
          <div
            className="text-sm text-accent-darkest font-bold flex items-center space-x-2"
            style={{ transform: "translateY(-3px)" }}
          >
            <span>{book.avgRate} / 5</span>
            <span className="text-xs">
              ({book.numOfRates.toLocaleString()} votes)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
