import type { AuctionType, BidType } from "@/app/types/auction"
import type { User } from "@/app/types/user"
import AppButton from "@/components/ui/AppButton"
import { toastError, toastSuccess } from "@/components/ui/Toast"
import { removeBid } from "@/service/sales-hotel"
import Image from "next/image"

type BuyTabPros = {
  user: User
  auctions: AuctionType[]
}

export default function BuyTab({ user, auctions }: BuyTabPros) {
  const handleClick = async (auction: AuctionType, bid: BidType) => {
    try {
      if (bid && auction) {
        await removeBid(bid.amount, auction.id, user.email)
        toastSuccess("Enchère annulée")
      }
    } catch (_error) {
      toastError("Une erreur est survenue")
      console.error(_error)
    }
  }

  function getCurrentPrice(auction: AuctionType) {
    if (auction.bids?.length) {
      return auction.bids[auction.bids.length - 1].amount
    }
    return auction.auction_price
  }

  return (
    <>
      <div className="w-[95%] flex flex-col gap-1 p-2 mt-4 max-h-[500px] overflow-y-auto">
        {auctions.every(auction => !auction.userBids || auction.userBids.length === 0) && (
          <p className="text-white text-center">Vous n'avez aucune enchères en cours.</p>
        )}

        {auctions.map((auction, index) =>
          auction.userBids?.map((bid, i) => (
            <div
              key={`${index}-${i}`}
              className="w-full flex flex-col lg:flex-row items-center justify-between p-1 bg-gradient-to-br from-[#F38424] to-[#F7C929] outline-[#F2E30B] rounded-[8px] outline-[4px]"
            >
              <Image src={auction.artefact?.image || "/placeholder.jpg"} width={60} height={60} alt="Artefact" />
              <div className="flex flex-col">
                <p className="hidden lg:block text-xl font-bolder text-white font-lilita drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  {auction.artefact.name}
                </p>
                <p className="text-md text-white italic font-lilita drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  Votre enchère : {bid.amount}
                </p>
              </div>
              <p className="hidden lg:block text-xl font-bolder text-white font-lilita drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {auction.artefact.rarity}
              </p>
              <div className="flex items-center gap-1">
                <p className="text-xl font-bolder text-white font-lilita drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  {getCurrentPrice(auction)}
                </p>
                <Image src={"/images/couronnes.png"} width={40} height={40} alt="Couronnes" />
              </div>
              <AppButton
                className="!w-30 border-[2px] bg-[#8B95B3] border-black"
                onClick={() => {
                  handleClick(auction, bid)
                }}
              >
                Annuler
              </AppButton>
            </div>
          )),
        )}
      </div>
    </>
  )
}
