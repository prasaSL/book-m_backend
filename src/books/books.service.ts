import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book-input';


@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private booksModel: Model<BookDocument>,

  ) {}

  // Get all books with populated author details
  async findAll(): Promise<Book[]> {
    return this.booksModel.find().exec();
  }

  // Get book by id with populated author details
  async findOne(id: string): Promise<Book> {
    return this.booksModel.findById(id).exec();
  }

  // Create book

  async create(createBookDto: CreateBookDto): Promise<Book> {
    if (!createBookDto.author) {
      throw new Error('Author is required');
    }
   
    const createdBook = new this.booksModel(createBookDto);
    const book = await createdBook.save();
   
    return book;
  }

  // Update book
  async update(id: string, updateBookDto: CreateBookDto): Promise<Book> {
    await this.booksModel
      .updateOne(
        {
          _id: id,
        },
        {
          $set: updateBookDto,
        },
      )
      .exec();
    return this.findOne(id);
  }

  //delete book
  async remove(id: string): Promise<Book> {
    const book = await this.booksModel.findById(id).exec();
    
    return this.booksModel.findByIdAndDelete(id).exec();
  }

  //search book by title or author or genre
  async search(search: string): Promise<Book[]> {
    return this.booksModel.find({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        {author: { $regex: search, $options: 'i' } },
        {genre: { $regex: search, $options: 'i' } },
      ],
    });
  }


  //search book by title or author
}
