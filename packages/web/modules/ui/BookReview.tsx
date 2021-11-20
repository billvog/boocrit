import { BookReviewFragment } from "@boocrit/controller";
import { formatDistance } from "date-fns";
import React from "react";
import { RatingView } from "react-simple-star-rating";

interface BookReviewProps {
  bookReview: BookReviewFragment;
}

export const BookReview: React.FC<BookReviewProps> = ({ bookReview }) => {
  return (
    <div className="flex flex-col p-4 bg-accent rounded-3xl">
      <div className="flex items-center">
        <div>
          <img
            src={bookReview.reviewee.profileImage}
            className="rounded-full"
            style={{ width: 48 }}
          />
        </div>
        <div className="flex flex-col ml-3">
          <div className="text-base leading-none font-bold">
            {bookReview.reviewee.fullName}
          </div>
          <div className="text-sm font-bold">
            <span className="text-gray-700">@</span>
            <span className="text-brown underline">
              {bookReview.reviewee.uid}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex">
          <div>
            <RatingView ratingValue={bookReview.rate} size={20} />
          </div>
          <div className="ml-2 text-accent-darkest">
            <b>{bookReview.rate}</b> / <b>5</b>
          </div>
        </div>
        <div className="text-secondary-hover font-medium">
          {bookReview.body}
        </div>
      </div>
      <div className="font-medium text-sm text-accent-darkest">
        {formatDistance(new Date(bookReview.createdAt), new Date(), {
          addSuffix: true,
        })}
      </div>
    </div>
  );
};
