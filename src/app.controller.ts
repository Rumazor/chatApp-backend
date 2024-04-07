import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDTO } from './dto/users.dto';

@Controller()
@UsePipes(ValidationPipe)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users')
  Users() {
    return this.appService.getUsers();
  }

  @Get('/users/:id')
  User(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.getUserById(id);
  }

  @Post('/users/create')
  CreateUser(@Body() body: CreateUserDTO) {
    return this.appService.createUser(body);
  }

  @Delete('/users/:id')
  DeleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteUser(id);
  }
}
