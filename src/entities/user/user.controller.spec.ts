import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should create a new user', async () => {
    const userDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    } as User;
    mockUserRepository.create.mockReturnValue(userDTO);
    mockUserRepository.save.mockResolvedValue(userDTO);

    const result = await userService.createUser(userDTO);

    expect(result).toEqual(userDTO);
    expect(mockUserRepository.create).toHaveBeenCalledWith(userDTO);
    expect(mockUserRepository.save).toHaveBeenCalledWith(userDTO);
  });
  it('should return an array of users', async () => {
    const users = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    ] as User[];
    mockUserRepository.find.mockResolvedValue(users);

    const result = await userService.getAllUsers();

    expect(result).toEqual(users);
    expect(mockUserRepository.find).toHaveBeenCalled();
  });

  it('should return a user by ID', async () => {
    const user = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    } as User;
    mockUserRepository.findOne.mockResolvedValue(user);

    const result = await userService.getUserByID(1);

    expect(result).toEqual(user);
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should throw an error if user not found', async () => {
    mockUserRepository.findOne.mockResolvedValue(null);

    await expect(userService.getUserByID(1)).rejects.toEqual(null);
  });

  it('should update a user', async () => {
    const user = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    } as User;
    const updatedUser = { ...user, firstName: 'Jane' };
    mockUserRepository.findOne.mockResolvedValue(user);
    mockUserRepository.save.mockResolvedValue(updatedUser);

    const result = await userService.updateUser(updatedUser);

    expect(result).toEqual(updatedUser);
    expect(mockUserRepository.save).toHaveBeenCalledWith(updatedUser);
  });

  it('should delete a user by ID', async () => {
    const user = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    } as User;
    mockUserRepository.findOne.mockResolvedValue(user);
    mockUserRepository.remove.mockResolvedValue(user);

    const result = await userService.deleteUserByID(1);

    expect(result).toEqual(user);
    expect(mockUserRepository.remove).toHaveBeenCalledWith(user);
  });
});
