import { Type } from "class-transformer"
import {IsEnum, IsNotEmpty, IsString } from "class-validator"

import { createConverter } from "src/firebase/firestore.convertor"

enum Rarity {
  BRONZE = "bronze",
  SILVER = "silver",
  GOLD = "gold",
}

export class SuccessDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name!: string

  @IsNotEmpty()
  @IsEnum(Rarity)
  @Type(() => String)
  rarity!: string
}

export const SuccessConverter = createConverter(SuccessDocument)
