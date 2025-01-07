import { InputType, Field ,ObjectType} from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../schemas/user.schema';

@InputType()
export class LoginUserInput {
  @Field()
 @IsNotEmpty() // Ensures the username is not empty
  username: string;

  @Field()
  @IsNotEmpty() // Ensures the password is not empty
  password: string;
}

@ObjectType()
export  class LoginResponse {
    @Field()
    
    accessToken: string;
  
    @Field(() => User)
    user: User;
  }