import { useUserBidsFromMergedAuctions } from "@/app/hook/sales-hotel/useUserBids"
import AppInput from "@/components/ui/AppInput"
import { useState } from "react"
import HdvTab from "./tabs/hdv/hdv-tab"
import BuyTab from "./tabs/user-bids/user-bids-tab"
import UserSalesTab from "./tabs/user-sales/user-sales-tab"

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function SalesHotel({ user }: any) {
  const { auctionsWithUserBids } = useUserBidsFromMergedAuctions(user?.email)
  const [query, setQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState<"hdv" | "ventes" | "enchères">("hdv")

  return (
    <>
      <div className="items-center flex-col flex bg-[#A96A3D] h-[100%] w-full rounded-lg border-4 border-[#5B3E29]">
        <div className="flex flex-col items-center h-full w-full">
          <p className="text-3xl font-bolder text-white py-4">Hotel de vente</p>
          <div className="w-[90%] flex flex-col lg:flex-row items-center gap-3">
            <AppInput
              type="text"
              placeholder="Recherchez un artefact, par rareté, par prix..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <div className="flex gap-2">
              {[
                { label: "HDV", key: "hdv" },
                { label: "Enchères", key: "enchères" },
                { label: "Ventes", key: "ventes" },
              ].map(({ label, key }) => (
                <button
                  key={key}
                  onClick={() => setSelectedTab(key as typeof selectedTab)}
                  className={`h-[40px] px-4 py-1 rounded-[8px] outline-[2px] cursor-pointer border-[2px] border-[#F65F26]/70 bg-gradient-to-b from-[#E9721E] to-[#F29D25] ${
                    selectedTab === key ? "brightness-100" : "brightness-75"
                  }`}
                >
                  <span className="stroke-1 font-lilita text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {user && auctionsWithUserBids && selectedTab === "hdv" && (
            <HdvTab user={user} auctions={auctionsWithUserBids} />
          )}

          {user && auctionsWithUserBids && selectedTab === "enchères" && (
            <BuyTab user={user} auctions={auctionsWithUserBids} />
          )}

          {user && auctionsWithUserBids && selectedTab === "ventes" && (
            <UserSalesTab user={user} auctions={auctionsWithUserBids} />
          )}
        </div>
      </div>
    </>
  )
}
