import { Type } from "class-transformer"
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"

import { createConverter } from "src/firebase/firestore.convertor"

export enum AuctionStatut {
  VALIDEE = "validée",
  EN_COURS = "en cours",
  ANNULEE = "annulée",
}

class BidEntry {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  user_id: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  user_email: string

  @IsNotEmpty()
  @Type(() => Number)
  bid_price: number
}

export class AuctionDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_user_artefact: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  creator_email: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_artefact: string

  @IsEnum(AuctionStatut)
  @Type(() => String)
  statut: AuctionStatut = AuctionStatut.EN_COURS

  @IsNotEmpty()
  @Type(() => Number)
  timer: number

  @IsOptional()
  @Type(() => Number)
  auction_price: number

  @IsOptional()
  @Type(() => Number)
  fix_price: number

  @Type(() => Number)
  created_at: number

  @IsOptional()
  @Type(() => BidEntry)
  bids: BidEntry[] = [] // historique des enchères
}

export const AuctionConverter = createConverter(AuctionDocument)
