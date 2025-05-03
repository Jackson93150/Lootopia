import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator"

import { createConverter } from "src/firebase/firestore.convertor"

export class InternalTransactionDocument {
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

export const InternalTransactionConverter = createConverter(InternalTransactionDocument)
