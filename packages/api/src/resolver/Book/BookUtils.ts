import { Book } from "../../entity/Book";
import { BookReview } from "../../entity/BookReview";
import { getConnection } from "typeorm";

export const UpdateBookAvgRate = async (bookId: string) => {
  const qb = getConnection()
    .getRepository(BookReview)
    .createQueryBuilder("bookreview")
    .where('bookreview."bookId" = :bookId', { bookId })
    .select("bookreview.rate");

  let avgRate = -1;

  const [reviews, count] = await qb.getManyAndCount();
  if (count > 0) {
    let rateSum = 0;
    reviews.map((r) => (rateSum += r.rate));
    avgRate = parseFloat((rateSum / count).toFixed(1));
  }

  await Book.update({ id: bookId }, { avgRate });
};
