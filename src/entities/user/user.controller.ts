import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  async getUserByID(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserByID(id);
  }

  @Post()
  async createUser() {}

  @Put('/:id')
  async updateUserByID(@Param('id', ParseIntPipe) id: number) {
    return await this.updateUserByID(id);
  }

  @Delete('/:id')
  async deleteUserByID(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUserByID(id);
  }
}
