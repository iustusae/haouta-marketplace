import { UserLogin } from './userlogin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UserLogin]), UserModule],
  exports: [TypeOrmModule],
})
export class UserLoginModule {}
