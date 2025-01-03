import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema()
@ObjectType()
export class Book {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true })
  title: string;
@Field()
  @Prop( {required: true }) // Use the model name as a string
  author: string;

  @Field()
  @Prop({ required: true })
  publishedYear: string;

  @Field()
  @Prop({ required: true })
  genre: string;
}

export type BookDocument = Book & Document;
export const BookSchema = SchemaFactory.createForClass(Book);
