import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // Mock the repository
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should call userRepository.insert with correct arguments', async () => {
      const user = new User();
      const insertResult = { raw: [], affected: 1 };
      jest
        .spyOn(repository, 'insert')
        .mockResolvedValue(insertResult as unknown as InsertResult);

      await service.createUser(user);

      expect(repository.insert).toHaveBeenCalledWith(user);
    });
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const result = [new User(), new User()];
      jest.spyOn(repository, 'find').mockResolvedValue(result);

      expect(await service.getAllUsers()).toBe(result);
    });
  });

  describe('getUserByID', () => {
    it('should return a user by ID', async () => {
      const user = new User();
      user.id = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      expect(await service.getUserByID(1)).toBe(user);
    });
  });

  describe('updateUser', () => {
    it('should call userRepository.save with correct arguments', async () => {
      const user = new User();
      const saveResult = new User();
      jest.spyOn(repository, 'save').mockResolvedValue(saveResult);

      await service.updateUser(user);

      expect(repository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('deleteUserByID', () => {
    it('should call userRepository.delete with correct arguments', async () => {
      const deleteResult = { affected: 1 };
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue(deleteResult as unknown as DeleteResult);

      await service.deleteUserByID(1);

      expect(repository.delete).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
