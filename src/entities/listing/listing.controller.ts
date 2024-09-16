import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingDTO } from './listing.dto';
import { Listing } from './listing.entity';
import { UserService } from '../user/user.service';

@Controller('/users/:id/listings')
export class ListingController {
  constructor(
    @Inject() private readonly listingService: ListingService,
    @Inject() private readonly userService: UserService,
  ) {}

  @Post()
  async createListing(
    @Body() listingDTO: ListingDTO,
    @Param('id') user_id: number,
  ) {
    return await this.listingService.createListing({
      ...listingDTO,
      owner: await this.userService.getUserByID(user_id),
    } as Listing);
  }

  @Get()
  async getAllUserListings(@Param('id', ParseIntPipe) id: number) {
    return await this.listingService.getAllUserListings(id);
  }

  @Get(':listing_id')
  async getUserListingByID(
    @Param('id') user_id: number,
    @Param('listing_id', ParseIntPipe) listing_id: number,
  ) {
    return await this.listingService.getListingByID(user_id, listing_id);
  }

  @Put(':listing_id')
  async updateListingByID(
    @Body() listingDTO: ListingDTO,
    @Param('listing_id', ParseIntPipe) listing_id: number,
    @Param('id', ParseIntPipe) user_id: number,
  ) {
    const listing: Listing = {
      id: listing_id,
      ...listingDTO,
      owner: await this.userService.getUserByID(user_id),
    };

    return await this.listingService.updateListing(listing);
  }

  @Delete(':listing_id')
  async deleteListingByID(
    @Param('listing_id', ParseIntPipe) listing_id: number,
  ) {
    return await this.listingService.deleteListingByID(listing_id);
  }

  @Delete()
  async deleteAllUserListings(@Param('id', ParseIntPipe) user_id: number) {
    return this.listingService.deleteAllUserListings(user_id);
  }
}
