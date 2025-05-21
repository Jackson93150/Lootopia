import type { AuctionType } from "@/app/types/auction"
import type { User } from "@/app/types/user"
import AppButton from "@/components/ui/AppButton"
import { toastError, toastSuccess } from "@/components/ui/Toast"
import { cancelAuction } from "@/service/sales-hotel"
import Image from "next/image"

type SaleTabProps = {
  user: User
  auctions: AuctionType[]
}

export default function UserSalesTab({ user, auctions }: SaleTabProps) {
  const handleClick = async (auction: AuctionType) => {
    try {
      if (auction && user) {
        await cancelAuction(user.email, auction.id, auction.id_user_artefact)

        toastSuccess("Mise en vente annulée")
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
      <div className="w-[95%] flex flex-col gap-1 p-2 mt-4 max-h-[500px] overflow-y-auto gap-4">
        {auctions.filter(a => a.creator_email === user.email).length === 0 && (
          <p className="text-white text-center">Vous n'avez aucune ventes</p>
        )}

        {auctions
          .filter(a => a.creator_email === user.email)
          .map((auction, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between p-1 bg-gradient-to-br from-[#F38424] to-[#F7C929] outline-[#F2E30B] rounded-[8px] outline-[4px]"
            >
              <Image src={auction.artefact.image} width={60} height={60} alt={"Artefact"} />
              <p className="hidden lg:block text-xl font-bolder text-white font-lilita drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {auction.artefact.name}
              </p>
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
                className="!w-30 cursor-pointer border-[2px] bg-[#8B95B3] border-black"
                onClick={() => {
                  handleClick(auction)
                }}
              >
                Annuler
              </AppButton>
            </div>
          ))}
      </div>
    </>
  )
}
