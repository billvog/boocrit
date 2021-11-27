import { BookFragment } from "src";
// TODO: change 404 image to the boocrit domain (boocrit.tk/assets/...)
export const useGetBookCover = (book: BookFragment) =>
  book.thumbnail || book.smallThumbnail || "/assets/book-cover-404.png";
