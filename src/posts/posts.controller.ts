import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostResponse } from './decorators/postResponse.decorator';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/create')
  @Auth()
  @PostResponse()
  createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postsService.createPost(user, createPostDto);
  }

  @Get()
  findAllPost() {
    return this.postsService.findAllPost();
  }

  @Get(':id')
  @Auth()
  findSinglePost(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    const { id } = user;
    return this.postsService.findSinglePost(id, postId);
  }
}
