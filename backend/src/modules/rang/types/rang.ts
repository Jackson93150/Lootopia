import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

export class RangDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  nom!: string

  @IsInt()
  @Min(0)
  @Type(() => Number)
  xp_min!: number

  @IsInt()
  @Min(0)
  @Type(() => Number)
  xp_max!: number

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  image!: string
}

export const RangConverter = createConverter(RangDocument)
