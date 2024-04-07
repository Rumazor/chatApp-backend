import { Injectable } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, createPostDto: CreatePostDto) {
    return this.prisma.user_posts.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        created_at: new Date(),
        user_id: userId,
      },
    });
  }

  findAll() {
    return `This action returns all posts`;
  }
}
