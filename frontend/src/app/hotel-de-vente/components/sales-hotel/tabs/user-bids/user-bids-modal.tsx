import type { AuctionType, BidType } from "@/app/types/auction"
import type { User } from "@/app/types/user"
import AppButton from "@/components/ui/AppButton"
import AppModal from "@/components/ui/AppModal"
import { toastError, toastSuccess } from "@/components/ui/Toast"
import { removeBid } from "@/service/sales-hotel"

type UserBidsModalProps = {
  modalIsOpen: boolean
  closeModal: () => void
  selectedUserBid: BidType
  selectedAuction: AuctionType
  user: User
}

export default function UserBidsModal({
  modalIsOpen,
  closeModal,
  selectedUserBid,
  selectedAuction,
  user,
}: UserBidsModalProps) {
  const handleClick = async () => {
    try {
      if (selectedUserBid && selectedAuction) {
        await removeBid(selectedUserBid.amount, selectedAuction.id, user.email)

        toastSuccess("Enchère annulée")
      }
    } catch (error) {
      toastError("Une erreur est survenue")
    }
  }

  const customStylesModal = {
    content: {
      display: "flex",
      flexDirection: "column",
    },
  }

  return (
    <AppModal modalIsOpen={modalIsOpen} closeModal={closeModal} styles={customStylesModal}>
      {selectedUserBid && (
        <div className="flex">
          <AppButton className="!p-2" onClick={handleClick}>
            Confirmer
          </AppButton>
        </div>
      )}
    </AppModal>
  )
}
