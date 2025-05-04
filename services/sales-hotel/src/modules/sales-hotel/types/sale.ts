import { Type } from "class-transformer"
import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from "class-validator"

import { createConverter } from "src/firebase/firestore.convertor"

enum SaleStatut {
  VALIDEE = "validée",
  EN_COURS = "en cours",
  ANNULEE = "annulée",
}

export class SaleDocument {
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
  crown_price!: number

  @IsEnum(SaleStatut)
  @Type(() => String)
  statut: SaleStatut
}

export const SaleConverter = createConverter(SaleDocument)
