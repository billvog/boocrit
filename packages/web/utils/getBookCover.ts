import { BookFragment } from "@boocrit/controller";

export const getBookCover = (book: BookFragment) =>
  book.thumbnail || book.smallThumbnail || "/assets/book-cover-404.png";
