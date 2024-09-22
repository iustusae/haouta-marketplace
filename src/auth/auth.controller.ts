import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './strategies/local/local.guard';
import { Request } from 'express';
import { JwtGuard } from './strategies/jwt/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return req.user;
  }
  @Post('register')
  async addNewUser(@Body() payload: AuthDTO) {
    return await this.authService.addNewUser(payload);
  }

  @Get('status')
  @UseGuards(JwtGuard)
  status(@Req() req: Request) {
    console.log(`status`);
    console.log(req.body);
    console.log(req.user);
    return req.user;
  }
}
