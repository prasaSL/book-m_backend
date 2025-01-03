import { forwardRef, Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { mongo } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])
    
  ],
  providers: [BooksService, BooksResolver],
  exports: [BooksService, MongooseModule],
})
export class BooksModule {}
