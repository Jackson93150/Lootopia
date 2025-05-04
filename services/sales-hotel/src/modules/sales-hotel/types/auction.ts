import { Type } from "class-transformer"
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator"

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

  @IsEnum(AuctionStatut)
  @Type(() => String)
  statut: AuctionStatut

  @IsOptional()
  @Type(() => Number)
  auction_price: number;

  @IsOptional()
  @Type(() => Number)
  fix_price: number;

  @IsOptional()
  @Type(() => Date)
  timer: Date;
}

export const AuctionConverter = createConverter(AuctionDocument)
