import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import mongoose from 'mongoose';
import { User } from '../schemas/user.schema';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
      controllers: [AuthController],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe('login', () => {
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

      expect(await authController.login(request.user)).toMatchObject(
        mockedTokens,
      );
    });
  });
});
