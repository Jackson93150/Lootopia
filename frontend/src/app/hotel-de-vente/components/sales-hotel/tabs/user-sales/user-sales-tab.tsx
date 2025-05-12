import type { AuctionType } from "@/app/types/auction"
import type { User } from "@/app/types/user"
import AppButton from "@/components/ui/AppButton"
import Image from "next/image"
import { useState } from "react"
import UserSalesModal from "./user-sales-modal"

type SaleTabProps = {
  user: User
  auctions: AuctionType[]
}

export default function UserSalesTab({ user, auctions }: SaleTabProps) {
  const [selectedUserSale, setSelectedUserSale] = useState<any | null>(null)
  const [modalIsOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
    setSelectedUserSale(null)
  }

  function getCurrentPrice(auction: AuctionType) {
    if (auction.bids?.length) {
      return auction.bids[auction.bids.length - 1].amount
    }
    return auction.auction_price
  }

  return (
    <>
      <div className="w-full flex flex-col gap-1 p-2 mt-4 max-h-[500px] overflow-y-auto">
        {auctions.filter(a => a.creator_email === user.email).length === 0 && (
          <p className="text-white text-center">Vous n'avez aucune ventes</p>
        )}

        {auctions
          .filter(a => a.creator_email === user.email)
          .map((auction, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between p-1 bg-gradient-to-br from-[#FAC27D] to-[#f5c249] rounded border-[2px] border-[#5B3E29]"
            >
              <Image src={auction.artefact.image} width={60} height={60} alt={"Artefact"} />
              <p className="hidden lg:block text-xl font-bolder text-white">{auction.artefact.name}</p>
              <p className="hidden lg:block text-xl font-bolder text-white">{auction.artefact.rarity}</p>
              <div className="flex items-center gap-1">
                <p className="text-xl font-bolder text-white">{getCurrentPrice(auction)}</p>
                <Image src={"/images/couronnes.png"} width={40} height={40} alt="Couronnes" />
              </div>
              <AppButton
                className="!w-30"
                onClick={() => {
                  setIsOpen(true)
                  setSelectedUserSale(auction)
                }}
              >
                Annuler
              </AppButton>
            </div>
          ))}
      </div>
      {user && selectedUserSale && (
        <UserSalesModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          selectedUserSale={selectedUserSale}
          user={user}
        />
      )}
    </>
  )
}
