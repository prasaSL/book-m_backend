import { InputType, Field, ID } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';


@InputType()

export class createAuthor {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  birthDate: Date;

  @Field(() => [String], { nullable: true })
  books: string[];
}


