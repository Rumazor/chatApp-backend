import { BadRequestException, Injectable } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ok } from 'assert';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(user: User, createPostDto: CreatePostDto) {
    const { id, email, fullName } = user;

    if (!user) throw new Error('User not found');
    try {
      const userPost = await this.prisma.user_posts.create({
        data: {
          title: createPostDto.title,
          content: createPostDto.content,
          created_at: new Date(),
          user_id: user.id,
        },
        select: {
          id: true,
          title: true,
          content: true,
          created_at: true,
        },
      });

      return {
        message: 'Post created successfully',
        data: userPost,
        user: {
          id: id,
          email: email,
          fullName: fullName,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllPost() {
    try {
      const userPosts = await this.prisma.user_posts.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          created_at: true,
          users: {
            select: {
              id: true,
              email: true,
              fullName: true,
            },
          },
        },
      });

      if (!userPosts) {
        return {
          message: 'No posts found',
        };
      }

      const userPostsResult = userPosts.map(({ users: user, ...post }) => ({
        ...post,
        user,
      }));

      return userPostsResult;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findSinglePost(userId: string, postId: number) {
    try {
      const userPost = await this.prisma.user_posts.findUnique({
        where: {
          user_id: userId,
          id: postId,
        },
        select: {
          id: true,
          title: true,
          content: true,
          created_at: true,
          user_id: true,
        },
      });

      if (!userPost) {
        return {
          message: 'Post not found or does not belong to user',
        };
      }

      return userPost;
    } catch (error) {
      throw new Error(error);
    }
  }
}
