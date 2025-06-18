import { Type } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Type(() => String)
  email!: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  username!: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  password!: string
}
