import { InputType, Field, ID } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { isNullableType } from 'graphql';

@InputType()
export class RegisterUserInput {

  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty() // Ensures the password is not empty
  @MinLength(6) // Ensures the password has at least 6 characters
  password: string;

  @Field({ nullable: true })
  role : string;
}
