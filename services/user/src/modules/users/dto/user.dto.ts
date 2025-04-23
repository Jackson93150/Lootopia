import { Type } from "class-transformer"
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  @Type(() => String)
  email!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  username!: string
  
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  password!: string

  @IsOptional()
  @IsString()
  @Type(() => String)
  uid?: string
}
