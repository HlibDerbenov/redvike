import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UserLoginBodyDto } from '../dto/user-login-body.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: UserLoginBodyDto })
  async login(@Request() req: Express.Request) {
    return this.authService.login(req.user);
  }
}
