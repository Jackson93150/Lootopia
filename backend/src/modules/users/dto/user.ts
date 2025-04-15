import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  @Type(() => String)
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  password!: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  username!: string;
}
