import { BookFragment } from "@boocrit/controller";
import React from "react";

interface BookControllerProps {
  book?: BookFragment | null;
}

export const BookController: React.FC<BookControllerProps> = ({ book }) => {
  return <div></div>;
};
