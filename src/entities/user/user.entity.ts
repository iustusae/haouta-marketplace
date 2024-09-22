import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Listing } from '../listing/listing.entity';
import { UserLogin } from '../UserLogin/userlogin.entity';

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

  @OneToOne(() => UserLogin, (user_info) => user_info)
  userLoginInfo: UserLogin;
}
