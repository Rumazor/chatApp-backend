import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
  imports: [AuthModule],
})
export class PostsModule {}
