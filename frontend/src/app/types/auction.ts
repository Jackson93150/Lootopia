import type { ArtefactData } from "./artefact"

export type AuctionType = {
  id: string
  auction_price: number
  created_at: number
  creator_email: string
  fix_price: string | null
  id_artefact: string
  id_user_artefact: string
  statut: string
  timer: number
  bids: BidType[] | []
  userBids: BidType[] | [] | null | undefined
  artefact: ArtefactData
}

export type BidType = {
  user_email: string
  user_id: string
  amount: number
}

export type AuctionModalProps = {
  modalIsOpen: boolean
  closeModal: () => void
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  selectedAuction: any | null
  userCrown: number
  userMail: string
}
