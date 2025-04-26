import { Type } from "class-transformer"
import { IsBoolean } from "class-validator"

export class AuthenticatedUserDto {
  @Type(() => String)
  id!: string

  @Type(() => Boolean)
  @IsBoolean()
  isAdmin!: boolean
}
