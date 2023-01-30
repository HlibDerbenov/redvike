import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { User } from '../schemas/user.schema';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  const mockedUser = {
    _id: new mongoose.Types.ObjectId('63d7222488ccaa7988fc390a'),
    username: 'Hlib_D',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: () => mockedUser,
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should return user by username', async () => {
    expect(await userService.findByUsername(mockedUser.username)).toMatchObject(
      {
        username: mockedUser.username,
      },
    );
  });
});
