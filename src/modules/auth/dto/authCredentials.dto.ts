import { Email, Password } from 'src/common/decorators/combined.decorator';

export default class AuthCredentialsDto {
  @Email()
  email: string;

  @Password()
  password: string;
}
