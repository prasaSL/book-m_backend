
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './schemas/author.schema';
import { createAuthor } from './dto/create-author-inputs';

@Resolver(() => Author)
export class AuthorsResolver {
    constructor(private readonly authorsService: AuthorsService) {}

    @Query(() => [Author] , {name: 'authors'})
    async getAuthors(): Promise<Author[]> {
      return this.authorsService.findAll();
    }

    @Query(()=>Author,{name:'author'})
    async getOneById(@Args('id') id: string): Promise<Author> {
        return this.authorsService.findOne(id);
        }

    @Mutation(()=> Author)
    async createAuthor(@Args('createAuthorInput') createAuthorInput: createAuthor): Promise<Author> {
      return this.authorsService.create(createAuthorInput);
    }

    @Mutation(()=> Author)
    async updateAuthor(@Args('id') id: string, @Args('updateAuthorInput') updateAuthorInput: createAuthor): Promise<Author> {
      return this.authorsService.update(id, updateAuthorInput);
    }

    @Mutation(()=> Author)
    async deleteAuthor(@Args('id') id: string): Promise<Author> {
      return this.authorsService.remove(id);
    }






}
