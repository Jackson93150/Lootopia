import { Type } from "class-transformer"
import {IsNotEmpty, IsString } from "class-validator"

import { createConverter } from "src/firebase/firestore.convertor"

export class TrophyDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  picture_url!: string
}

export const TrophyConverter = createConverter(TrophyDocument)
