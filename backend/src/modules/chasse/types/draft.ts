import { Type } from "class-transformer"
import { IsArray, IsBoolean, IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

enum ChasseType {
  RA = "RA",
  CARTE = "carte",
}

export class DraftDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_createur!: string

  @IsOptional()
  @IsString()
  @Type(() => String)
  titre?: string

  @IsOptional()
  @IsString()
  @Type(() => String)
  description?: string

  @IsOptional()
  @IsEnum(ChasseType)
  @Type(() => String)
  type?: ChasseType

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  is_public?: boolean

  @IsInt()
  @Min(0)
  @Type(() => Number)
  frais: number

  @IsInt()
  @Min(0)
  @Type(() => Number)
  limite_participants: number

  @IsOptional()
  @IsString()
  @Type(() => String)
  ville?: string

  @IsOptional()
  @IsString()
  @Type(() => String)
  pays?: string

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  duree_recreusage?: number

  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  couleurs_principales: string[] = ["#FFFFF", "#00000"]

  @IsBoolean()
  @Type(() => Boolean)
  chat: boolean

  @IsOptional()
  @IsString()
  @Type(() => String)
  id_messagerie?: string

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date_debut?: Date

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date_fin?: Date
}

export const DraftConverter = createConverter(DraftDocument)
