import { Controller, Inject, Get } from '@nestjs/common';
import { Services } from 'src/utils/contants';
import { IUserService } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(
    @Inject(Services.USER_SERVICE) private userService: IUserService,
  ) {}

  @Get()
  async getAllUsers() {
    return await this.userService.find();
  }
}
