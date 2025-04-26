import { Type } from "class-transformer"
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateIf } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

enum RecompenseType {
  ARTEFACT = "Artefact",
  COURONNES = "Couronnes",
}

export class RecompenseInterneDocument {
  @IsNotEmpty()
  @IsEnum(RecompenseType)
  @Type(() => String)
  type!: RecompenseType

  @ValidateIf(o => o.type === RecompenseType.COURONNES)
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  montant_couronnes?: number

  @ValidateIf(o => o.type === RecompenseType.ARTEFACT)
  @IsOptional()
  @IsString()
  @Type(() => String)
  id_artefact?: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_user!: string
}

export const RecompenseInterneConverter = createConverter(RecompenseInterneDocument)
