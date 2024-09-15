import { forwardRef, Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingController } from './listing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './listing.entity';
import { UserModule } from '../user/user.module';

@Module({
  providers: [ListingService],
  controllers: [ListingController],
  imports: [TypeOrmModule.forFeature([Listing]), forwardRef(() => UserModule)],
})
export class ListingModule {}
