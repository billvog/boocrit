import axios from "axios";
import { Book } from "../entity/Book";

const BooksAPIURL = `https://www.googleapis.com/books/v1/volumes?key=${process.env.GOOGLE_BOOKS_API_KEY}`;

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
    industryIdentifiers: [
      {
        type: string;
        identifier: string;
      }
    ];
  };
};

type FetchBookResponse = {
  totalItems: number;
  items: FetchedBook[];
};

export const FetchedBookToBookEntiry = (book: FetchedBook) => {
  let isbn: string = "-";
  book.volumeInfo.industryIdentifiers.map((id) =>
    id.type === "ISBN_13" ? (isbn = id.identifier) : null
  );

  return Book.create({
    id: isbn,
    title: book.volumeInfo.title,
    description: book.volumeInfo.description || undefined,
    authors: book.volumeInfo.authors || [],
    publisher: book.volumeInfo.publisher || "",
    language: book.volumeInfo.language || undefined,
    pageCount: book.volumeInfo.pageCount || undefined,
    publishedDate: book.volumeInfo.publishedDate || "",
    categories: book.volumeInfo.categories || [],
    smallThumbnail: book.volumeInfo.imageLinks?.smallThumbnail || undefined,
    thumbnail: book.volumeInfo.imageLinks?.thumbnail || undefined,
    avgRate: -1,
    numOfRates: -1,
    createdAt: new Date(book.volumeInfo.publishedDate || 0),
    updatedAt: new Date(book.volumeInfo.publishedDate || 0),
    reviews: undefined,
  });
};

export const FetchBookByISBN = async (isbn: string) => {
  const response = await axios.get<FetchBookResponse>(
    BooksAPIURL + "&q=isbn:" + isbn
  );

  return response.data.items[0];
};

export const FetchedBookWithParams = async (
  key: ":intitle" | ":inauthor" | ":inpublisher" | "",
  value: string,
  startIndex: number = 0,
  maxResults: number = 10
) => {
  console.log(encodeURI(value));

  const respone = await axios.get<FetchBookResponse>(
    `${BooksAPIURL}&q=${
      key != "" ? `${key}=${encodeURI(value)}` : encodeURI(value)
    }&startIndex=${startIndex}&maxResults=${maxResults}`
  );

  return respone.data;
};
