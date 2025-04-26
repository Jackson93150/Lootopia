import { Type } from "class-transformer"
import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

enum IndiceType {
  AUDIO = "Audio",
  IMAGE = "Image",
  VIDEO = "Vidéo",
  TEXT = "Text",
}

export class IndiceDocument {
  @IsNotEmpty()
  @IsEnum(IndiceType)
  @Type(() => String)
  type!: IndiceType

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  indice!: string

  @IsInt()
  @Min(1)
  @Type(() => Number)
  order!: number

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_chasse!: string
}

export const IndiceConverter = createConverter(IndiceDocument)
