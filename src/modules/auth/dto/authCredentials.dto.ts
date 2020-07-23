import { Email, Password } from 'src/common/decorators/combined.decorator';

export default class AuthCredentialsDto {
  email: string;

  password: string;
}
