import { Type } from "class-transformer"
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

enum Rarete {
  COMMUN = "commun",
  RARE = "rare",
  EPIQUE = "epique",
  LEGENDAIRE = "légendaire",
}

enum ArtefactEvent {
  HALLOWEEN = "Halloween",
  NOEL = "Noel",
  ETE = "Été",
}

export class ArtefactDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  nom!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  description!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  type!: string

  @IsBoolean()
  @Type(() => Boolean)
  enchere: boolean

  @IsNotEmpty()
  @IsEnum(Rarete)
  @Type(() => String)
  rarete!: Rarete

  @IsOptional()
  @IsEnum(ArtefactEvent)
  @Type(() => String)
  event?: ArtefactEvent

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  valeur_enchere?: number

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  valeur_achat?: number

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  fusionnable?: boolean

  @IsBoolean()
  @Type(() => Boolean)
  is_exported: boolean

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  image!: string
}

export const ArtefactConverter = createConverter(ArtefactDocument)
