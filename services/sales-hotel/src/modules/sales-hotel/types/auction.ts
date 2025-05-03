import { Type } from "class-transformer"
import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from "class-validator"

import { createConverter } from "src/firebase/firestore.convertor"

enum AuctionStatut {
  VALIDEE = "validée",
  SURENCHERI = "sur-enchéri",
  EN_COURS = "en cours",
  ANNULEE = "annulée",
}

export class AuctionDocument {
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

  @IsEnum(AuctionStatut)
  @Type(() => String)
  statut: AuctionStatut = AuctionStatut.EN_COURS
}

export const AuctionConverter = createConverter(AuctionDocument)
