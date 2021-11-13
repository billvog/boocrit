import { Field, Float, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@ObjectType()
@Entity({ name: "book_reviews" })
export class BookReview extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  revieweeId: string;

  @Field()
  @ManyToOne(() => User, (user) => user.reviews)
  reviewee: User;

  @Field()
  @Column()
  bookId: string;

  @Field(() => Book)
  book: Book;

  @Field(() => Float)
  @Column({ type: "float" })
  rate: number;

  @Field()
  @Column({ type: "text" })
  body: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
