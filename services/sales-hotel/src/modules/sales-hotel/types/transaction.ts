import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

export class TransactionInterneDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_artefact!: string

  @IsInt()
  @Min(0)
  @Type(() => Number)
  prix!: number

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_acheteur!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_vendeur!: string
}

export const TransactionInterneConverter = createConverter(TransactionInterneDocument)
