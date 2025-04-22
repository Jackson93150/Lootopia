import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

export class UserArtefactDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_user!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_artefact!: string

  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantite!: number
}

export const UserArtefactConverter = createConverter(UserArtefactDocument)
