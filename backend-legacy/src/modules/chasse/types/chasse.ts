import { Type } from "class-transformer"
import { IsArray, IsBoolean, IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

enum ChasseType {
  RA = "RA",
  CARTE = "carte",
}

enum ChasseStatut {
  ACTIVE = "active",
  SUSPENDUE = "suspendue",
  SUPPRIMEE = "supprimée",
  TERMINE = "terminé",
  DRAFT = "draft",
}

export class ChasseDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_createur!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  titre!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  description!: string

  @IsNotEmpty()
  @IsEnum(ChasseType)
  @Type(() => String)
  type!: ChasseType

  @IsEnum(ChasseStatut)
  @Type(() => String)
  statut: ChasseStatut = ChasseStatut.DRAFT

  @IsBoolean()
  @Type(() => Boolean)
  is_public!: boolean

  @IsInt()
  @Min(0)
  @Type(() => Number)
  frais: number

  @IsInt()
  @Min(0)
  @Type(() => Number)
  limite_participants: number

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  ville!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  pays!: string

  @IsInt()
  @Min(1)
  @Type(() => Number)
  duree_recreusage!: number

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

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date_debut!: Date

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date_fin!: Date

  @IsOptional()
  @IsString()
  @Type(() => String)
  id_draft?: string
}

export const ChasseConverter = createConverter(ChasseDocument)
