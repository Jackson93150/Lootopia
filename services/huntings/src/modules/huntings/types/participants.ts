import { Type } from "class-transformer"
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from "class-validator"
import { createConverter } from "src/firebase/firestore.convertor"

enum Statut {
  LEAVED = "Quitté",
  IN_PROGRESS = "En cours",
  FINISHED = "Terminé",
}

export class ParticipantDocument {
  @IsNotEmpty()
  id_user: string

  @IsNotEmpty()
  id_chasse: string

  @IsNotEmpty()
  @IsNumber()
  start_play: number

  @IsNotEmpty()
  @IsEnum(Statut)
  @Type(() => String)
  statut: Statut

  @IsBoolean()
  is_winner = false
}

export const ParticipantConverter = createConverter(ParticipantDocument)
