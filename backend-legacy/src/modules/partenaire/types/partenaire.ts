import { Type } from "class-transformer"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

export class PartenaireDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  nom!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  description!: string

  @IsOptional()
  @IsString()
  @Type(() => String)
  site_web?: string

  @IsOptional()
  @IsString()
  @Type(() => String)
  logo_url?: string
}

export const PartenaireConverter = createConverter(PartenaireDocument)
