import type { AuctionType } from "@/app/types/auction"
import type { User } from "@/app/types/user"
import AppButton from "@/components/ui/AppButton"
import Image from "next/image"
import { useState } from "react"
import UserBidsModal from "./user-bids-modal"

type BuyTabPros = {
  user: User
  auctions: AuctionType[]
}

export default function BuyTab({ user, auctions }: BuyTabPros) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [selectedUserBid, setSelectedUserBid] = useState<any | null>(null)
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [selectedAuction, setSelectedAuction] = useState<any | null>(null)
  const [modalIsOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
    setSelectedUserBid(null)
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
        {auctions.every(auction => !auction.userBids || auction.userBids.length === 0) && (
          <p className="text-white text-center">Vous n'avez aucune enchères en cours.</p>
        )}

        {auctions.map((auction, index) =>
          auction.userBids?.map((bid, i) => (
            <div
              key={`${index}-${i}`}
              className="w-full flex flex-col lg:flex-row items-center justify-between p-1 bg-gradient-to-br from-[#FAC27D] to-[#f5c249] rounded border-[2px] border-[#5B3E29]"
            >
              <Image src={auction.artefact?.image || "/placeholder.jpg"} width={60} height={60} alt="Artefact" />
              <div className="flex flex-col">
                <p className="hidden lg:block text-xl font-bolder text-white">{auction.artefact.name}</p>
                <p className="text-md text-white italic">Votre enchère : {bid.amount}</p>
              </div>
              <p className="hidden lg:block text-xl font-bolder text-white">{auction.artefact.rarity}</p>
              <div className="flex items-center gap-1">
                <p className="text-xl font-bolder text-white">{getCurrentPrice(auction)}</p>
                <Image src={"/images/couronnes.png"} width={40} height={40} alt="Couronnes" />
              </div>
              <AppButton
                className="!w-30"
                onClick={() => {
                  setIsOpen(true)
                  setSelectedUserBid(bid)
                  setSelectedAuction(auction)
                }}
              >
                Annuler
              </AppButton>
            </div>
          )),
        )}
      </div>

      {user && selectedUserBid && (
        <UserBidsModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          selectedUserBid={selectedUserBid}
          selectedAuction={selectedAuction}
          user={user}
        />
      )}
    </>
  )
}
