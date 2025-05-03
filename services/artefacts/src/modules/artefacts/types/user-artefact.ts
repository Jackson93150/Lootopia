import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator"

import { createConverter } from "src/firebase/firestore.convertor"

export class UserArtefactDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_user!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_artefact!: string
}

export const UserArtefactConverter = createConverter(UserArtefactDocument)
