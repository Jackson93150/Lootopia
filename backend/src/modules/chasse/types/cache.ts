import { Type } from "class-transformer"
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

enum PrecisionLevel {
  UN_M = "1m",
  DIX_M = "10m",
  CENT_M = "100m",
  MILLE_M = "1000m",
}

export class CacheDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_chasse!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  point_geographique!: string

  @IsEnum(PrecisionLevel)
  @Type(() => String)
  precision: PrecisionLevel = PrecisionLevel.UN_M

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  montant_couronnes?: number

  @IsInt()
  @Min(0)
  @Type(() => Number)
  xp: number

  @IsBoolean()
  @Type(() => Boolean)
  unique: boolean

  @IsOptional()
  @IsString()
  @Type(() => String)
  id_artefact?: string
}

export const CacheConverter = createConverter(CacheDocument)
