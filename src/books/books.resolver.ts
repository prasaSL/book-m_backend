import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Book } from './schemas/book.schema';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book-input';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => [Book], { name: 'books' })
  async getBooks(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  async getOneById(@Args('id') id: string): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Query(() => [Book], { name: 'search' })
  async searchBook(@Args('search') search: string): Promise<Book[]> {
    return this.booksService.search(search);
  }

  @Mutation(() => Book)
  async createBook(@Args('createBookInput') createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Mutation(() => Book)
  async updateBook(
    @Args('id') id: string,
    @Args('updateBookInput') updateBookDto: CreateBookDto,
  ): Promise<Book> {
    return this.booksService.update(id, updateBookDto);
  }

  @Mutation(() => Book)
  async deleteBook(@Args('id') id: string): Promise<Book> {
    return this.booksService.remove(id);
  }
}
