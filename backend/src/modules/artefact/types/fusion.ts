import { Type } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

export class FusionDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_artefact_1!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_artefact_2!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_artefact_result!: string
}

export const FusionConverter = createConverter(FusionDocument)
