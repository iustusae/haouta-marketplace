import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './entities/user/user.module';
import { ListingModule } from './entities/listing/listing.module';
import { User } from './entities/user/user.entity';
import { Listing } from './entities/listing/listing.entity';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';
import { UserLogin } from './entities/UserLogin/userlogin.entity';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: path.join(__dirname, '..', 'data', 'db.sqlite'),
            entities: [User, Listing, UserLogin],
            synchronize: false,
            logging: true,
        }),
        UserModule,
        ListingModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private dataSource: DataSource) { }
}
