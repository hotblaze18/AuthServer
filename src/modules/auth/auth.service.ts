import { Injectable, BadRequestException } from '@nestjs/common';
import AuthCredentialsDto from './dto/authCredentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Connection } from 'typeorm';
import { atomic } from 'src/common/database/transaction';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private connection: Connection,
  ) {}

  async signIn(
    authCredentials: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentials;

    const user = await atomic(
      this.connection,
      this.userService.getUserByEmail,
      email,
    );

    const authenticated = await this.userService.validatePassword(
      user,
      password,
    );

    if (!authenticated) {
      throw new BadRequestException('Incorrect username or password');
    }

    const payload = {
      email,
      id: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateToken(accessToken: string) {
    const { id, email } = await this.jwtService.verifyAsync(accessToken);
    return { id, email };
  }
}
