import { Type } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"

import { createConverter } from "src/firebase/firestore.convertor"

export class UserSuccessDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  user_id!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  success_id!: string
}

export const UserSuccessConverter = createConverter(UserSuccessDocument)
