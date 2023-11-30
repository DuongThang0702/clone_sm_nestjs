import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IUserService } from './interfaces/user.interface';
import { UserDto } from './dtos';
import { userDetail } from './user.types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/utils/entities';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async update(id: number, data: object): Promise<UpdateResult> {
    const response = await this.userRepo.update(id, { ...data });
    return response;
  }
  async delete(id: number): Promise<DeleteResult> {
    const response = await this.userRepo.delete(id);
    return response;
  }
  async find(req?: object): Promise<User[]> {
    const response = await this.userRepo.find();
    return response;
  }
  async findBy(data: object): Promise<User> {
    const response = await this.userRepo.findOneBy({ ...data });
    if (!response)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    return response;
  }
  async create(data: userDetail): Promise<UserDto> {
    const newUser = await this.userRepo.save({ ...data });
    return plainToInstance(UserDto, newUser, { excludeExtraneousValues: true });
  }
}
