import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'mySecret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
