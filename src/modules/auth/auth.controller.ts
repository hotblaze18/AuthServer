import { Controller, UseGuards, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @MessagePattern({ role: 'auth', cmd: 'verify' })
  async loggedIn(data) {
    try {
      const res = this.authService.validateToken(data.jwt);

      return res;
    } catch (err) {
      return false;
    }
  }
}
