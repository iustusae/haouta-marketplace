import { forwardRef, Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingController } from './listing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './listing.entity';
import { UserModule } from '../user/user.module';
import { GlobalListingsController } from './global_listing.controller';
import { UserService } from '../user/user.service';

@Module({
  providers: [ListingService, UserService],
  controllers: [ListingController, GlobalListingsController],
  imports: [TypeOrmModule.forFeature([Listing]), forwardRef(() => UserModule)],
  exports: [TypeOrmModule],
})
export class ListingModule {}
