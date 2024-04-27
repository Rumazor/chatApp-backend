import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'Post title',
    description: 'The title of the post',
  })
  @IsString({
    message: 'Title must be a string',
  })
  @MinLength(2, { message: 'Title is too short' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({
    example: 'Post content',
    description: 'The content of the post',
  })
  @IsString({
    message: 'Content must be a string',
  })
  @IsNotEmpty({
    message: 'Content is required',
  })
  @MinLength(3, { message: 'Content is too short' })
  content: string;
}
