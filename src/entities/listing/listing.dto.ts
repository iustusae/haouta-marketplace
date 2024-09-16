import { IsDecimal, IsNotEmpty } from 'class-validator';

export class ListingDTO {
  @IsNotEmpty()
  title: string;

  description: string;

  @IsNotEmpty()
  location: string;

  @IsDecimal()
  @IsNotEmpty()
  price: number;
}
