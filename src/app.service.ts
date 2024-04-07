import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateUserDTO } from './dto/users.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    try {
      const users = await this.prisma.users.findMany();
      return users;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserById(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('User ID is required');
      }
      const user = await this.prisma.users.findUnique({
        where: {
          id: id,
        },
      });

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createUser(data: CreateUserDTO) {
    try {
      const user = await this.prisma.users.create({
        data,
      });

      return {
        message: 'User created successfully',
        user,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteUser(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('User ID is required');
      }
      const user = await this.prisma.users.delete({
        where: {
          id: id,
        },
      });

      return 'User deleted successfully';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
