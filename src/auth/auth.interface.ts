import { User } from 'src/utils/entities';
import { LoginDto, LoginRs } from './auth.dtos';

export interface IAuthService {
  login(data: LoginDto): Promise<LoginRs>;
  logout(user: User, rf: string);
  generateAccessToken(data: User): Promise<string>;
  generateRefreshToken(data: User): Promise<string>;
}
