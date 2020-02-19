import { User } from './user.model';

export class TokenDto {
  public jwt: string;
  public expires: string;
  public currentUser: User;
  public expiresJsTicks: number;
}

export class Login {
  public name: string;
  public password: string;
}
