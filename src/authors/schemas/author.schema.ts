import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthorDocument = Author & Document;

@Schema()
@ObjectType() // Expose this class as a GraphQL Object Type
export class Author {
  @Field(() => ID)
  _id:string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  bio?: string;

  @Field({ nullable: true })
  @Prop()
  birthDate?: Date;

  @Field(() => [String], { nullable: true }) // Array of strings
  @Prop({ type: [String] }) // MongoDB schema definition
  books?: string[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
