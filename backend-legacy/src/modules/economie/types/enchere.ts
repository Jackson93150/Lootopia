import { Type } from "class-transformer"
import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

enum EnchereStatut {
  VALIDEE = "validée",
  SURENCHERI = "sur-enchéri",
  EN_COURS = "en cours",
  ANNULEE = "annulée",
}

export class EnchereDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_artefact!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_user!: string

  @IsInt()
  @Min(1)
  @Type(() => Number)
  valeur!: number

  @IsEnum(EnchereStatut)
  @Type(() => String)
  statut: EnchereStatut = EnchereStatut.EN_COURS
}

export const EnchereConverter = createConverter(EnchereDocument)
