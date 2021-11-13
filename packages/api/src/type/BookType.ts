type BookLanguage = "en" | "es" | "fr" | "unknown";
export interface BookType {
  authors: string[];
  categories: string[];
  description?: string | undefined;
  imageLinks?:
    | {
        smallThumbnail: string;
        thumbnail: string;
      }
    | undefined;
  industryIdentifiers: string[];
  infoLink: string;
  language: BookLanguage;
  pageCount?: number | undefined;
  previewLink: string;
  printType: "BOOK";
  publishedDate: string;
  publisher: string;
  title: string;
}
