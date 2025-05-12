import type { AuctionModalProps, AuctionType } from "@/app/types/auction"
import AppButton from "@/components/ui/AppButton"
import AppInput from "@/components/ui/AppInput"
import AppModal from "@/components/ui/AppModal"
import { toastError, toastSuccess } from "@/components/ui/Toast"
import { addBid, directlyBuy } from "@/service/sales-hotel"
import Image from "next/image"
import { useRef } from "react"

export default function HdvModal({ modalIsOpen, closeModal, selectedAuction, userCrown, userMail }: AuctionModalProps) {
  const inputNewBidAuctionRef = useRef<HTMLInputElement>(null)
  const endAuctionDate = new Date(selectedAuction.timer * 1000 + selectedAuction.created_at)
  const formattedDate = formatDate(endAuctionDate)

  function getCurrentPrice(auction: AuctionType) {
    if (auction.bids?.length) {
      return auction.bids[auction.bids.length - 1].amount
    }
    return auction.auction_price
  }

  const handleBidClick = async () => {
    if (inputNewBidAuctionRef.current) {
      const inputNewBidAuctionValue = inputNewBidAuctionRef.current.value
      const currentPriceOfAuction = getCurrentPrice(selectedAuction)

      if (currentPriceOfAuction >= Number(inputNewBidAuctionValue)) {
        toastError("Une erreur est survenue")
        return
      }

      if (userCrown < Number(inputNewBidAuctionValue)) {
        toastError("Solde insuffisant")
        return
      }

      try {
        if (inputNewBidAuctionValue) {
          await addBid(Number(inputNewBidAuctionValue), selectedAuction.id, userMail)

          toastSuccess("Enchère validée")
          closeModal()
        }
      } catch (error) {
        toastError("Une erreur est survenue")
      }
    }
  }

  const handleDirectlyBuyClick = async () => {
    if (userCrown < selectedAuction.fix_price) {
      toastError("Solde insuffisant")
      return
    }

    try {
      await directlyBuy(
        selectedAuction.fix_price,
        selectedAuction.id,
        selectedAuction.id_user_artefact,
        selectedAuction.artefact.id,
        selectedAuction.creator_email,
      )

      toastSuccess("Achat validée")
      closeModal()
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
      {selectedAuction && (
        <>
          <div className="flex items-center w-full justify-around p-5">
            <div className="flex flex-col items-center gap-5">
              <p className="font-bolder text-2xl">{selectedAuction.artefact.name}</p>
              <Image src={selectedAuction.artefact.image} width={150} height={150} alt={"Artefact"} />
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-5">
            <div className="flex flex-col items-center w-full">
              <p className="w-full text-start ps-2">Enchère à </p>
              <div className="w-full flex justify-around gap-5">
                <AppInput
                  ref={inputNewBidAuctionRef}
                  type="number"
                  placeholder={String(getCurrentPrice(selectedAuction))}
                />
                <AppButton className="!w-30" onClick={handleBidClick}>
                  Enchéri
                </AppButton>
              </div>
            </div>

            {selectedAuction.fix_price && (
              <div className="flex flex-col items-center w-full">
                <p className="w-full text-start ps-2">Achat direct à </p>
                <div className="w-full flex justify-around gap-5">
                  <AppInput className="!text-center" type="number" value={selectedAuction.fix_price} disabled />
                  <AppButton className="!w-30" onClick={handleDirectlyBuyClick}>
                    Achète
                  </AppButton>
                </div>
              </div>
            )}
          </div>

          <div className="text-center pt-4">
            <p>Fin de l'enchère le {formattedDate}</p>
          </div>
        </>
      )}
    </AppModal>
  )
}

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  return `${day}/${month}/${year} à ${hours}:${minutes}:${seconds}`
}
