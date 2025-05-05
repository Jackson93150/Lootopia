import { Type } from "class-transformer"
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"

import { createConverter } from "src/firebase/firestore.convertor"

enum AuctionStatut {
  VALIDEE = "validée",
  EN_COURS = "en cours",
  ANNULEE = "annulée",
}

export class AuctionDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_user_artefact: string

  @IsOptional()
  @IsString()
  @Type(() => String)
  id_enricher: string

  @IsEnum(AuctionStatut)
  @Type(() => String)
  statut: AuctionStatut

  @IsNotEmpty()
  @Type(() => Number)
  timer: number

  @IsOptional()
  @Type(() => Number)
  auction_price: number

  @IsOptional()
  @Type(() => Number)
  fix_price: number
}

export const AuctionConverter = createConverter(AuctionDocument)
