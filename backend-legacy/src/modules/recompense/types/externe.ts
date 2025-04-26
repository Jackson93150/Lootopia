import { Type } from "class-transformer"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"

import { createConverter } from "../../firebase/firestore.convertor"

enum RecompenseExterneType {
  BIENS_MATERIELS = "biens matériels",
  OFFRES_PARTENAIRES = "offres partenaires",
  BONS_ACHATS = "bon d’achats",
}

enum RecompenseExterneStatut {
  ENVOYEE = "Envoyée",
  EN_COURS = "en cours",
  ANNULE = "annulé",
}

export class RecompenseExterneDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  nom!: string

  @IsNotEmpty()
  @IsEnum(RecompenseExterneType)
  @Type(() => String)
  type!: RecompenseExterneType

  @IsNotEmpty()
  @IsEnum(RecompenseExterneStatut)
  @Type(() => String)
  statut!: RecompenseExterneStatut

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_sender!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  id_receiver!: string
}

export const RecompenseExterneConverter = createConverter(RecompenseExterneDocument)
