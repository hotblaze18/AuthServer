import { Word, Email } from 'src/common/decorators/combined.decorator';

/**
 * request class for updating existing user.
 */
export class UpdateUserRequest {
  @Word()
  readonly firstName?: string;

  @Word()
  readonly lastName?: string;

  @Email()
  readonly email?: string;
}
