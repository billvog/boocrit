import { Book } from "../../entity/Book";
import { Arg, FieldResolver, Float, Query, Resolver, Root } from "type-graphql";
import { PaginationInput } from "../PaginationInput";
import { PaginatedBooksResponse } from "./BookResponse";
import { getConnection } from "typeorm";
import { BookReview } from "../../entity/BookReview";

@Resolver(Book)
export class BookResolver {
  @FieldResolver(() => Float)
  async avgRate(@Root() book: Book) {
    const qb = getConnection()
      .getRepository(BookReview)
      .createQueryBuilder("bookreview")
      .where('bookreview."bookId" = :isbn', { isbn: book.id })
      .select("bookreview.rate");

    const [reviews, count] = await qb.getManyAndCount();

    if (count <= 0) return -1;

    let rateSum = 0;
    reviews.map((r) => (rateSum += r.rate));

    return (rateSum / count).toFixed(1);
  }

  @Query(() => PaginatedBooksResponse)
  async Books(
    @Arg("pagination") pagination: PaginationInput
  ): Promise<PaginatedBooksResponse> {
    const realLimit = Math.min(50, pagination.limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = getConnection()
      .getRepository(Book)
      .createQueryBuilder("book")
      .orderBy('book."createdAt"', "DESC")
      .limit(realLimitPlusOne);

    if (pagination.skip && pagination.skip > 0) {
      qb.offset(pagination.skip);
    }

    const [books, count] = await qb.getManyAndCount();
    return {
      books: books.slice(0, realLimit),
      hasMore: books.length === realLimitPlusOne,
      count,
    };
  }
}
