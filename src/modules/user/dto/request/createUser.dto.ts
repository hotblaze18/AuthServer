import { Match } from 'src/common/decorators/match.decorator';
import {
  Word,
  Password,
  Email,
} from 'src/common/decorators/combined.decorator';

/**
 * request class for creating new user
 */
export class CreateUserRequest {
  @Word()
  readonly firstName: string;

  @Word()
  readonly lastName: string;

  @Email()
  readonly email: string;

  @Password()
  readonly password: string;

  @Match('password', {
    message: 'password and confirmation password do not match',
  })
  readonly confirmPassword: string;
}
