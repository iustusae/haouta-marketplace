import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDTO } from './auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogin } from 'src/entities/UserLogin/userlogin.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { IncorrectPasswordError } from './incorrect-password.error';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserLogin)
    private readonly userLoginRepository: Repository<UserLogin>,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(payload: AuthDTO) {
    const user = await this.userLoginRepository.findOne({
      where: { username: payload.username },
    });

    if (!user) {
      throw new EntityNotFoundError(UserLogin, payload);
    }

    if (payload.password !== user.password) {
      throw new IncorrectPasswordError();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...fuser } = user;
    return this.jwtService.sign(fuser);
  }

  async addNewUser(userInfo: AuthDTO) {
    const user = await this.userLoginRepository.findOne({
      where: { username: userInfo.username },
    });

    if (!user) {
      return this.userLoginRepository.save({
        username: userInfo.username,
        password: userInfo.password,
      });
    } else {
      throw new HttpException(
        `Username ${userInfo.username} is already taken!`,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
