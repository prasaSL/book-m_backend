import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerUserInput: RegisterUserInput): Promise<User> {
    const { username, password,role } = registerUserInput;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const user = new this.userModel({ username, password: hashedPassword ,});
    return user.save();
  }

  async login(loginUserInput: LoginUserInput): Promise<{ accessToken: string, user: User }> {
    const { username, password } = loginUserInput;
  
    // Check if user exists
    const user = await this.userModel.findOne({ username }).exec();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const payload = { username: user.username, sub: user._id, roles: user.role };
    const accessToken = this.jwtService.sign(payload);
  
    // Convert to object and remove password field
    const userObject = user.toObject();
    delete userObject.password;
    userObject.id = userObject._id; // Map _id to id
    delete userObject.password;
    delete userObject._id; // Remove _id field
  
    return { accessToken, user: userObject };
  }
}
