import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from '../listing/listing.entity';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @OneToMany(() => Listing, (listings) => listings.id)
  listings: Listing[];
}
