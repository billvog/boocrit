import { Field, Float, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { BookReview } from "./BookReview";

@ObjectType()
@Entity({ name: "books" })
export class Book extends BaseEntity {
  // Book Info
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  title: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  description?: string;

  @Field()
  @Column()
  publisher: string;

  @Field()
  @Column()
  language: string;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  pageCount?: number;

  @Field()
  @Column()
  publishedDate: string;

  @Field(() => [String])
  @Column({ type: "text", array: true })
  categories: string[];

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  smallThumbnail?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  thumbnail?: string;
  // End of Book Info

  @Field(() => [BookReview])
  @OneToMany(() => BookReview, (review) => review.reviewee)
  reviews: BookReview[];

  @Field(() => Float)
  // @Column({ type: "float", default: -1 })
  avgRate: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
