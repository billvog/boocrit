import { BookFragment } from "@boocrit/controller";
import React from "react";
import { RatingView } from "react-simple-star-rating";

interface BookProps {
  book: BookFragment;
}

export const Book: React.FC<BookProps> = ({ book }) => {
  return (
    <div
      className="bg-accent border-4 border-accent-semidark rounded-3xl p-3.5 flex space-x-3.5"
      style={{
        width: 400,
      }}
    >
      <div>
        <img
          src={book.thumbnail || book.smallThumbnail || ""}
          style={{ width: 64 }}
          className="rounded-xl"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="leading-tight">
          <div className="text-2xl text-secondary group-hover:text-secondary-hover font-black">
            {book.title}
          </div>
          <div className="text-secondary">
            from <span className="font-bold">{book.publisher}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <RatingView ratingValue={book.avgRate} stars={5} size={20} />
          <div
            className="text-sm text-accent-darkest font-bold"
            style={{ transform: "translateY(-3px)" }}
          >
            {book.avgRate} / 5 (x votes)
          </div>
        </div>
      </div>
    </div>
  );
};
