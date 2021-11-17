import axios from "axios";

const BooksAPIURL = `https://www.googleapis.com/books/v1/volumes?key=${process.env.GOOGLE_BOOKS_API_KEY}&`;

export type FetchedBook = {
  volumeInfo: {
    title: string;
    description?: string;
    authors: string[];
    publisher: string;
    categories: string[];
    publishedDate: string;
    pageCount?: number;
    printType: string;
    maturityRating: "NOT_MATURE";
    language: string;
    previewLink: string;
    infoLink: string;
    imageLinks?: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };
};

type FetchBookResponse = {
  totalItems: number;
  items: FetchedBook[];
};

export const FetchBookByISBN = async (isbn: string) => {
  const respone = await axios.get<FetchBookResponse>(
    BooksAPIURL + "q=isbn:" + isbn
  );

  return respone.data.items[0];
};

export const FetchedBookWithParams = async (
  key: ":intitle" | ":inauthor" | ":inpublisher" | "",
  value: string,
  startIndex: number = 0,
  maxResults: number = 10
) => {
  const respone = await axios.get<FetchBookResponse>(
    `${BooksAPIURL}q=${
      key != "" ? `${key}=${value}` : value
    }&startIndex=${startIndex}&maxResults=${maxResults}`
  );

  return respone.data;
};
