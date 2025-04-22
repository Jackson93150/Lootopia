import { Type } from "class-transformer"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

enum WhitelistStatus {
  EN_COURS = "en cours",
  ACCEPTE = "Accepted",
  REFUSE = "refusé",
  EXPIRE = "expired",
}

export class WhitelistDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_chasse!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_user!: string

  @IsEnum(WhitelistStatus)
  @Type(() => String)
  status: WhitelistStatus = WhitelistStatus.EN_COURS
}

export const WhitelistConverter = createConverter(WhitelistDocument)
