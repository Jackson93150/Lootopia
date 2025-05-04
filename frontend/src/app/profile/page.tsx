"use client"

import Image from "next/image"
import "../globals.css"
import { getUserArtefact } from "@/service/rewards"
import { useEffect, useState } from "react"
import { useMe } from "../hook/useMe"
import type { UserArtefact } from "../types/artefact"

export default function ProfilePage() {
  const [artefacts, setArtefacts] = useState<UserArtefact[] | null>(null)
  const { user, loading } = useMe()
  const rarityOrder = ["Légendaire", "Épique", "Rare", "Commun"]
  const [selectedTab, setSelectedTab] = useState<"artefacts" | "trophies" | "success">("artefacts")

  useEffect(() => {
    async function fetchData() {
      const res = await getUserArtefact()
      setArtefacts(res)
    }

    void fetchData()
  }, [])

  const groupedArtefacts = artefacts
    ? rarityOrder.map(rarity => ({
        rarity,
        artefacts: artefacts.filter(a => a.artefact.rarity === rarity),
      }))
    : []

  return (
    <div className="w-screen h-screen items-center justify-center flex">
      {!loading && (
        <div className="w-screen h-screen flex border pt-30 px-15 pb-10">
          <Image src="/profile-container.png" alt="container" fill className="absolute pt-30 px-15 pb-10" />
          <div className="w-full flex h-full p-14 gap-8 z-10">
            <div className="h-full w-[250px] bg-[#A96A3D] outline-[#5B3E29] outline-[8px] rounded-[8px] p-4 flex flex-col gap-2">
              <div className="w-full h-[30%] bg-[#FAC27D] rounded-[8px] border p-2">
                <div className="w-full h-full rounded-[8px] border overflow-hidden">
                  <Image
                    src={
                      user.logo_url ??
                      "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"
                    }
                    alt="profile"
                    width={500}
                    height={500}
                    className="size-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full grow bg-[#FAC27D] rounded-[8px] border p-2">{user.biographie ?? "No Bio"}</div>
            </div>
            <div className="h-full grow flex flex-col">
              <div className="relative h-[15%] ml-4 items-end gap-1 flex w-fit">
                <span className="absolute top-0 text-white font-lilita text-[24px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  {user.username}
                </span>

                {[
                  { label: "Artefacts", key: "artefacts" },
                  { label: "Trophées", key: "trophies" },
                  { label: "Succès", key: "success" },
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

              <div className="z-10 h-[85%] grow bg-[#A96A3D] outline-[#5B3E29] outline-[8px] rounded-[8px] overflow-y-auto min-h-0 flex flex-col gap-10 p-6">
                {selectedTab === "artefacts" && (
                  <div className="flex flex-col gap-10 p-6">
                    {groupedArtefacts.map(({ rarity, artefacts }) =>
                      artefacts.length > 0 ? (
                        <div key={rarity} className="flex flex-col gap-4">
                          <h2 className="text-white font-lilita text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                            {rarity}
                          </h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {artefacts.map(artefact => (
                              <div key={artefact.id_artefact} className="p-[5px] rounded-[20px] bg-[#ff9900] shadow-md">
                                <div className="w-full rounded-[16px] bg-gradient-to-br from-[#FAC27D] to-[#f5c249] border-[2px] border-[#333333] flex flex-col items-center justify-start p-2 h-[250px]">
                                  <div className="w-full text-center text-md font-bold truncate font-lilita text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)]">
                                    {artefact.artefact.name}
                                  </div>
                                  <div className="flex items-center justify-center flex-grow">
                                    <Image
                                      src={artefact.artefact.image}
                                      alt={artefact.artefact.name}
                                      width={180}
                                      height={180}
                                      className="object-cover rounded"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null,
                    )}
                  </div>
                )}

                {selectedTab === "trophies" && (
                  <div className="p-6 text-white font-lilita text-xl">Trophées à venir 🏆</div>
                )}

                {selectedTab === "success" && (
                  <div className="p-6 text-white font-lilita text-xl">Succès à débloquer 🌟</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
