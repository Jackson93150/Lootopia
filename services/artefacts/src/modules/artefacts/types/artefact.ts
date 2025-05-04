import { Type } from "class-transformer"
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator"

import { createConverter } from "src/firebase/firestore.convertor"

enum Rarete {
  COMMUN = "Commun",
  RARE = "Rare",
  EPIQUE = "Épique",
  LEGENDAIRE = "Légendaire",
}

enum ArtefactEvent {
  HALLOWEEN = "Halloween",
  NOEL = "Noel",
  ETE = "Été",
}

enum ArtefactType {
  // ------ Seulement l'artefact de TYPE CARD a un niveau de rareté ------ //

  CARD = "Carte", // Utilisations potentielles dans le gameplay (ex. : révélation d’indices, modification des règles d’une chasse).
  MAGIC_KEY = "Clé magique", // Pour ouvrir des coffres rares.
  NAVIGATION_CARD = "Carte de navigation", // Dévoile des caches cachées sur une carte.
  GOLDEN_CUP = 'Coupe dorée', // Permet de doubler les récompenses pendant une période donnée.
  LEGENDARY_COMPASS = 'Boussole légendaire' // Améliore la précision du monde réel
}

export class ArtefactDocument {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  description!: string

  @IsNotEmpty()
  @IsEnum(ArtefactType)
  @Type(() => String)
  type!: string

  @IsNotEmpty()
  @IsEnum(Rarete)
  @Type(() => String)
  rarity!: Rarete

  @IsOptional()
  @IsEnum(ArtefactEvent)
  @Type(() => String)
  event?: ArtefactEvent

  // @IsOptional()
  // @IsInt()
  // @Min(0)
  // @Type(() => Number)
  // crown_price?: number

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  fusionnable?: boolean

  @IsBoolean()
  @Type(() => Boolean)
  is_exported_nft: boolean

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  image!: string
}

export const ArtefactConverter = createConverter(ArtefactDocument)
