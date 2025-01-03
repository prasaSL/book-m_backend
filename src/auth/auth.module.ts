import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  JwtModule.register({
    secret: 'yourSecretKey', // Replace with your secret key
    signOptions: { expiresIn: '60m' },
  }),
],
  providers: [AuthService, AuthResolver,JwtStrategy]
})
export class AuthModule {}
