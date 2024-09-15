import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { User } from './user.entity';
import { EntityNotFoundError } from 'typeorm';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserByID(@Param('id', ParseIntPipe) id: number) {
    const user: User = await this.userService.getUserByID(id);
    if (!user) {
      throw new EntityNotFoundError(User, id);
    }
    return user;
  }

  @Post()
  async createUser(@Body() createUserDto: UserDTO) {
    return await this.userService.createUser(createUserDto as User);
  }

  @Put(':id')
  async updateUserByID(@Param('id', ParseIntPipe) id: number) {
    return await this.updateUserByID(id);
  }

  @Delete(':id')
  async deleteUserByID(@Param('id', ParseIntPipe) id: number) {
    const user: User = await this.userService.getUserByID(id);
    if (!user) {
      throw new EntityNotFoundError(User, id);
    }
    return await this.userService.deleteUser(user);
  }
}
