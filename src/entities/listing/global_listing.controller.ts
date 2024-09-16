import { Controller, Get, Inject } from '@nestjs/common';
import { ListingService } from './listing.service';

@Controller('listings')
export class GlobalListingsController {
  constructor(@Inject() private readonly listingService: ListingService) {}

  @Get()
  async getAllListings() {
    return await this.listingService.getAllListings();
  }
}
