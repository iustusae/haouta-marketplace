import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing } from './listing.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    @InjectRepository(User)
    private readonly userRepository: Repository<Listing>,
  ) {}

  async createListing(listing: Listing) {
    return this.listingRepository.insert(listing);
  }

  async getAllListings() {
    return this.listingRepository.find();
  }

  async getAllUserListings(user_id: number) {
    return this.listingRepository.findOne({
      where: { owner: { id: user_id } },
    });
  }

  async getListingByID(listing_id: number) {
    return this.listingRepository.findOne({ where: { id: listing_id } });
  }

  async updateListingByID(newListing: Listing) {
    return this.listingRepository.save(newListing);
  }

  async deleteAllUserListings(user_id: number) {
    return this.listingRepository.delete({ owner: { id: user_id } });
  }

  async deleteListingByID(listing_id: number) {
    return this.listingRepository.delete({ id: listing_id });
  }
}
