import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

export class EnigmeDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  question!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  reponse!: string

  @IsInt()
  @Min(1)
  @Type(() => Number)
  order!: number

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_chasse!: string
}

export const EnigmeConverter = createConverter(EnigmeDocument)
