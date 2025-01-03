import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './schemas/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }])
  ],
  providers: [AuthorsService, AuthorsResolver]
})
export class AuthorsModule {}
