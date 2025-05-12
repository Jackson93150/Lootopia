import type { AuctionType } from "@/app/types/auction"
import type { User } from "@/app/types/user"
import AppButton from "@/components/ui/AppButton"
import AppModal from "@/components/ui/AppModal"
import { toastError, toastSuccess } from "@/components/ui/Toast"
import { cancelAuction } from "@/service/sales-hotel"

type UserSalesModalProps = {
  modalIsOpen: boolean
  closeModal: () => void
  selectedUserSale: AuctionType
  user: User
}

export default function UserSalesModal({ modalIsOpen, closeModal, selectedUserSale, user }: UserSalesModalProps) {
  const handleClick = async () => {
    try {
      if (selectedUserSale && user) {
        await cancelAuction(user.email, selectedUserSale.id, selectedUserSale.id_user_artefact)

        toastSuccess("Mise en vente annulée")
        closeModal()
      }
    } catch (_error) {
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
      {selectedUserSale && (
        <div className="flex">
          <AppButton className="!p-2" onClick={handleClick}>
            Annuler la vente
          </AppButton>
        </div>
      )}
    </AppModal>
  )
}
