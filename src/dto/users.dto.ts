import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UsersDTO {
  id: number;
}

export class CreateUserDTO {
  @IsString({ message: 'userName must be a string' })
  @IsNotEmpty({ message: 'userName is required' })
  @MinLength(1, { message: 'userName must be at least 1 character long' })
  readonly username: string;
}
