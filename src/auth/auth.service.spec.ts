import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { User } from '../schemas/user.schema';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  const mockedUser = {
    _id: new mongoose.Types.ObjectId('63d7222488ccaa7988fc390a'),
    username: 'Hlib_1',
    password:
      '4de91a459dd000de2509c3a5e96bcb13772e94522588a8848ead1185cad6915d',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: () => mockedUser,
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should validate user', async () => {
    expect(
      await authService.validateUser(mockedUser.username, 'redvike_1'),
    ).toMatchObject({
      _id: mockedUser._id,
    });
  });

  it('should login user', async () => {
    const mockedTokens = {
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhsaWJfRCIsInN1YiI6IjYzZDcyMjI0ODhjY2FhNzk4OGZjMzkwYSIsImlhdCI6MTY3NTExNTUzMiwiZXhwIjoxNjc1MTE1NTkyfQ.UcZiGaBAbRnsR-EeYXbcE0nzf6_FI23ZaBUwy32rgeY',
    };
    const mockRequest = (payload) => {
      return {
        user: payload,
      };
    };
    const request = mockRequest({
      user: { username: 'Test_User', sub: new mongoose.Types.ObjectId() },
    });

    jest
      .spyOn(authService, 'login')
      .mockImplementation(async () => mockedTokens);

    expect(await authService.login(request.user)).toMatchObject(mockedTokens);
  });
});
