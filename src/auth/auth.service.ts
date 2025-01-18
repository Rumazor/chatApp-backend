import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtPayload } from 'src/interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async createUser(createUserDto: CreateUserDTO) {
    try {
      const { password, ...userData } = createUserDto;

      const user = await this.prisma.users.create({
        data: {
          ...userData,
          email: userData.email.toLowerCase().trim(),
          password: bcrypt.hashSync(password, 10),
        },
      });

      delete user.password;
      return {
        ...user,
        token: this.getJwtToken({
          sub: user.id,
        }),
      };
    } catch (error) {
      console.error('Error creating user:', error);
      this.handleDBErrors(error);
    }
  }

  async loginUser(LoginUserDTO: LoginUserDTO) {
    const { email, password } = LoginUserDTO;

    const user = await this.prisma.users.findUnique({
      where: {
        email: email.toLowerCase().trim(),
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (!user) throw new UnauthorizedException('Credentials are invalid');

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Credentials are invalid');

    delete user.password;
    return {
      ...user,
      token: this.getJwtToken({
        sub: user.id,
      }),
    };
  }

  private handleDBErrors(error: any): never {
    if (error.code === 'P2002') {
      throw new BadRequestException('User with this email already exists');
    }
    throw new InternalServerErrorException('Please check server logs');
  }
}
