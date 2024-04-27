import { ApiProperty } from '@nestjs/swagger';

export class Post {
  @ApiProperty({ example: 1, required: true, uniqueItems: true })
  id: number;

  @ApiProperty({
    example: 'Post title',
    required: true,
    description: 'The title of the post',
  })
  title: string;

  @ApiProperty({
    example: 'Post content',
    required: true,
    description: 'The content of the post',
  })
  content: string;

  @ApiProperty({ example: '2021-09-01T00:00:00.000Z', required: true })
  created_at: Date;

  //uuid
  @ApiProperty({
    example: 'f4d7b1d7-3e6e-4b3d-8c2f-2c8c7f8f1b0d',
    required: true,
    uniqueItems: true,
  })
  user_id: number;
}
