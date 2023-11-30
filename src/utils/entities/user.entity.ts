import { Entity, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class User extends Base {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    default: 'user',
  })
  role: string;

  @Column()
  fullname: string;

  @Column({ default: '' })
  refresh_token: string;
}
