import type { UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"

export type ArtefactData = {
  id: string
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
  artefact: {
    id_firebase: string
    name: string
    rarity: string
    image: string
    type: string
    description: string
  }
}

export type OwnArtefactFormData = {
  direct_sale: boolean
  auction_price: number
  timer: "1h" | "1d" | "1w"
  fix_price: number | null
}

export type OwnArtefactModalProps = {
  modalIsOpen: boolean
  closeModal: () => void
  selectedOwnArtefact: UserArtefact | null
  registerForm: UseFormRegister<OwnArtefactFormData>
  handleSubmit: UseFormHandleSubmit<OwnArtefactFormData>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onSubmit: (values: any) => void
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onInvalid: (errors: any) => void
  watch: UseFormWatch<OwnArtefactFormData>
  setValue: UseFormSetValue<OwnArtefactFormData>
}
