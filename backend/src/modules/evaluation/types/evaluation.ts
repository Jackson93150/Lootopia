import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

export class EvaluationDocument {
  @IsInt()
  @Min(0)
  @Max(10)
  @Type(() => Number)
  note!: number

  @IsOptional()
  @IsString()
  @Type(() => String)
  commentaire?: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_utilisateur!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_chasse!: string
}

export const EvaluationConverter = createConverter(EvaluationDocument)
