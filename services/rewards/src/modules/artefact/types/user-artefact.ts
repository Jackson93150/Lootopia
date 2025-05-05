import { Type } from "class-transformer"
import { IsBoolean, IsNotEmpty, IsString } from "class-validator"

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

  @IsBoolean()
  @Type(() => Boolean)
  auction = false

  @IsBoolean()
  @Type(() => Boolean)
  is_saled = false

  @IsBoolean()
  @Type(() => Boolean)
  is_exported_nft = false
}

export const UserArtefactConverter = createConverter(UserArtefactDocument)
