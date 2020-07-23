import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import AuthCredentialsDto from './dto/authCredentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signIn(
    @Body() authCredentials: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentials);
  }

  @Get('/check')
  check(@Headers('authorization') authHeader: string) {
    const accessToken = authHeader.split(' ')[1];
    return this.authService.validateToken(accessToken);
  }
}
