import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/create')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(
      '46436f87-500d-4900-a962-a1e112514ab6',
      createPostDto,
    );
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }
}
