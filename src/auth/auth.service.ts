import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { IAuthService } from './auth.interface';
import { LoginDto, LoginRs } from './auth.dtos';
import { Services } from 'src/utils/contants';
import { IUserService } from 'src/user/interfaces/user.interface';
import { User } from 'src/utils/entities';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USER_SERVICE) private userService: IUserService,
    private jwtService: JwtService,
  ) {}
  async logout(userDecode: User, rf: string) {
    const user = await this.userService.findBy({ id: userDecode.id });
    if (user.refresh_token === rf)
      return await this.userService.update(user.id, { refresh_token: '' });
    else throw new HttpException('login required', HttpStatus.UNAUTHORIZED);
  }
  async generateAccessToken(data: User): Promise<string> {
    return await this.jwtService.signAsync(
      { _id: data.id, email: data.email, fullname: data.fullname },
      {
        expiresIn: process.env.EXPIRESIN_ACCESSTOKEN,
        secret: process.env.KEY_ACCESSTOKEN,
      },
    );
  }
  async generateRefreshToken(data: User): Promise<string> {
    return await this.jwtService.signAsync(
      { id: data.id },
      {
        expiresIn: process.env.EXPIRESIN_REFRESHTOKEN,
        secret: process.env.KEY_REFRESHTOKEN,
      },
    );
  }
  async login(data: LoginDto): Promise<LoginRs> {
    const user = await this.userService.findBy({ email: data.email });
    if (user.password !== data.password)
      throw new HttpException('wrong password', HttpStatus.BAD_REQUEST);
    const access_token = await this.generateAccessToken(user);
    const refresh_token = await this.generateRefreshToken(user);
    await this.userService.update(user.id, { refresh_token });
    return {
      access_token,
      refresh_token,
    };
  }
}
