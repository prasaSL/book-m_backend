import { Resolver, Mutation, Args,Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto/register-user.input';
import { LoginResponse, LoginUserInput } from './dto/login-user.input';
import { User } from './schemas/user.schema';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello World!';
  }


  @Mutation(() => User)
  async register(@Args('registerUserInput') registerUserInput: RegisterUserInput): Promise<User> {
    return this.authService.register(registerUserInput);
  }

  @Mutation(() => LoginResponse)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput): Promise<LoginResponse> {
     
    return await this.authService.login(loginUserInput);
  }
}
