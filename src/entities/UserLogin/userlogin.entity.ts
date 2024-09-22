import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('user_login')
export class UserLogin {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @OneToOne(() => User, (user) => user.id)
  user: User;

  @Column({ type: 'varchar', length: '255', unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;
}
