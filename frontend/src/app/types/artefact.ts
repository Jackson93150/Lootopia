export type ArtefactData = {
  id_firebase: string
  image: string
  name: string
  description: string
  rarity: "Commun" | "Rare" | "Épique" | "Légendaire"
  type: string
  fusionnable: boolean
}

export type UserArtefact = {
  id_artefact: string
  id_firebase: string
  id_user: string
  is_exported_nft: boolean
  is_saled: boolean
  auction: boolean
  artefact: ArtefactData
}
