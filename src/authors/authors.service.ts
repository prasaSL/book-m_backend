import { Injectable } from '@nestjs/common';
import { Author, AuthorDocument } from './schemas/author.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createAuthor } from './dto/create-author-inputs';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  // Get all authors
  async findAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  // Get author by id
  async findOne(id: string): Promise<Author> {
    return this.authorModel.findById(id).exec();
  }

  // Create author
  async create(createAuthorDto: createAuthor): Promise<Author> {
    const createdAuthor = new this.authorModel(createAuthorDto);
    return createdAuthor.save();
  }

  // Update author
  async update(id: string, updateAuthorDto: createAuthor): Promise<Author> {
    return this.authorModel
      .findByIdAndUpdate(id, updateAuthorDto, { new: true })
      .exec();
  }

  // Delete author
  async remove(id: string): Promise<Author> {
    const author = await this.authorModel.findById(id).exec();
    if (author.books.length > 0) {
      throw new Error('Author has books still');
    }

    return this.authorModel.findByIdAndDelete(id).exec();
  }
}
