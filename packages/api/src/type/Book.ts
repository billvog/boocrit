import { Field, ObjectType } from "type-graphql";

@ObjectType()
class ImageListType {
  @Field()
  smallThumbnail: string;
  @Field()
  thumbnail: string;
}

@ObjectType()
export class Book {
  @Field(() => [String])
  authors: string[];
  @Field(() => [String])
  categories: string[];
  @Field()
  description?: string;
  @Field(() => ImageListType, { nullable: true })
  imageLinks?: ImageListType | undefined;
  @Field(() => [String])
  industryIdentifiers: string[];
  @Field()
  infoLink: string;
  @Field()
  language: string;
  @Field()
  pageCount?: number;
  @Field()
  previewLink: string;
  @Field()
  publishedDate: string;
  @Field()
  publisher: string;
  @Field()
  title: string;
}
