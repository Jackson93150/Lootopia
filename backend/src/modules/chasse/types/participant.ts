import { Type } from "class-transformer"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

enum ParticipantStatut {
  EN_COURS = "en cours",
  TERMINE = "terminé",
  QUITTE = "quitté",
}

export class ParticipantDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_utilisateur!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_chasse!: string

  @IsEnum(ParticipantStatut)
  @Type(() => String)
  statut: ParticipantStatut = ParticipantStatut.EN_COURS
}

export const ParticipantConverter = createConverter(ParticipantDocument)
