import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { User } from './user.entity';
import { EntityNotFoundError } from 'typeorm';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/strategies/jwt/jwt.guard';

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

  @Get('/u/:username')
  async getUserByUsername(@Param('username') username: string) {
    return await this.userService.findByUsername(username);
  }

  @Post('/a')
  @UseGuards(JwtGuard)
  async mergeUserWithLoginInfo(@Req() req: Request, @Body() userDTO: UserDTO) {
    const user: User = { ...userDTO, userLoginInfo: { ...req.body } } as User;
    return await this.userService.createUser(user);
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
    return await this.userService.deleteUserByID(id);
  }
}
