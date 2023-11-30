import { User } from 'src/utils/entities';
import { UserDto } from '../dtos';
import { userDetail } from '../user.types';
import { DeleteResult, UpdateResult } from 'typeorm';

export interface IUserService {
  create(data: userDetail): Promise<UserDto>;
  find(req?: object): Promise<User[]>;
  findBy(data: object): Promise<User>;
  update(uid: number, data: object): Promise<UpdateResult>;
  delete(uid: number): Promise<DeleteResult>;
}
