import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Post } from '../entities/post.entity';

export const PostResponse = () => {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: 'Post created successfully',
      type: Post,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
  );
};
