import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDTO) {
    try {
      const { password, ...userData } = createUserDto;

      const user = await this.prisma.users.create({
        data: {
          ...userData,
          password: bcrypt.hashSync(password, 10),
        },
      });

      delete user.password;

      return {
        message: 'User created successfully',
        user,
        // retornar el JWT
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async loginUser(LoginUserDTO: LoginUserDTO) {
    const { email, password } = LoginUserDTO;

    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        password: true,
      },
    });

    if (!user) throw new UnauthorizedException('Credentials are invalid');

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Credentials are invalid');

    return user;
    //retornar JWT
  }

  private handleDBErrors(error: any): never {
    if (error.code === 'P2002') {
      throw new BadRequestException('User with this email already exists');
    }
    throw new InternalServerErrorException('Please check server logs');
  }
}
