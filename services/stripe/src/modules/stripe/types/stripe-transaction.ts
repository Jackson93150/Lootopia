import { Type } from "class-transformer"
import { IsDate, IsInt, IsNotEmpty, IsString, Min } from "class-validator"

import { createConverter } from "../../../firebase/firestore.convertor"

export class StripeTransactionDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_user!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  txh!: string

  @IsInt()
  @Min(1)
  @Type(() => Number)
  montant_couronnes!: number

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_crown_package!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  statut!: string
}

export const StripeTransactionConverter = createConverter(StripeTransactionDocument)
