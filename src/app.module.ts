import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './entities/user/user.module';
import { ListingModule } from './entities/listing/listing.module';
import { User } from './entities/user/user.entity';
import { Listing } from './entities/listing/listing.entity';
import { DataSource } from 'typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: path.join(__dirname, '..', 'data', 'db.sqlite'),
      entities: [User, Listing],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    ListingModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
