import type { BidType } from "@/app/types/auction"
import { useMemo } from "react"
import { useMergedAuctionsWithArtefact } from "./useAuctions"

export function useUserBidsFromMergedAuctions(userEmail?: string) {
  const { auctions, loading } = useMergedAuctionsWithArtefact()

  const auctionsWithUserBids = useMemo(() => {
    if (!userEmail) return []

    return auctions
      .map(auction => {
        const userBids = (auction.bids || []).filter((bid: BidType) => bid.user_email === userEmail)

        return {
          ...auction,
          userBids,
        }
      })
      .filter(Boolean)
  }, [auctions, userEmail])

  return { auctionsWithUserBids, loading }
}
