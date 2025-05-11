import { Type } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"

import { createConverter } from "src/firebase/firestore.convertor"

export class UserTrophyDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  user_id!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  trophy_id!: string

  @IsNotEmpty()
  @Type(() => String)
  date!: string  
}

export const UserTrophyConverter = createConverter(UserTrophyDocument)
