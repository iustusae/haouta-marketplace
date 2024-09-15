import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: User) {
    return this.userRepository.insert(user);
  }

  async getAllUsers() {
    return this.userRepository.find();
  }
  async getUserByID(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async updateUser(newUser: User) {
    return this.userRepository.save(newUser);
  }

  async deleteUserByID(id: number) {
    return this.userRepository.delete({ id: id });
  }

  async deleteUser(user: User) {
    return this.userRepository.remove(user);
  }
}
