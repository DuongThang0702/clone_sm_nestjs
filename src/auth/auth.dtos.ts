import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(8)
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @IsNotEmpty()
  fullname: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(8)
  email: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class LoginRs {
  @Expose()
  access_token: string;
  @Exclude()
  refresh_token: string;
}
