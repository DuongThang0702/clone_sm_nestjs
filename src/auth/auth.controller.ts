import {
  Controller,
  Inject,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Res,
  Req,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { IUserService } from 'src/user/interfaces/user.interface';
import { Services } from 'src/utils/contants';
import { LoginDto, LoginRs, RegisterDto } from './auth.dtos';
import { IAuthService } from './auth.interface';
import { JwtAuthGuard } from './guard';
import { plainToInstance } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(Services.USER_SERVICE) private userService: IUserService,
    @Inject(Services.AUTH_SERVICE) private authService: IAuthService,
  ) {}

  @Post('register')
  async register(@Body() data: RegisterDto) {
    return await this.userService.create(data);
  }

  @Post('login')
  async login(@Body() data: LoginDto, @Res() res) {
    const response = await this.authService.login(data);
    res.cookie('refresh_token', response.refresh_token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    return res
      .status(200)
      .json(
        plainToInstance(LoginRs, response, { excludeExtraneousValues: true }),
      );
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req) {
    const cookies = req.cookies;
    if (!cookies || !cookies.refresh_token)
      throw new HttpException('login required', HttpStatus.UNAUTHORIZED);
    return await this.authService.logout(req.user, cookies.refresh_token);
  }
}
