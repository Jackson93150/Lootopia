"use client"

import Image from "next/image"
import "../../globals.css"
import type { User } from "@/app/types/user"
import { RankDisplay } from "@/components/ui/RankDisplay"
import { getUserArtefact, getUserLockedSuccess, getUserSuccess, getUserTrophy } from "@/service/rewards"
import { getUserById } from "@/service/user"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import type { UserArtefact } from "../../types/artefact"
import type { Success, UserSuccess } from "../../types/success"
import type { UserTrophy } from "../../types/trophy"

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>()
  const [artefacts, setArtefacts] = useState<UserArtefact[] | null>(null)
  const [trophys, setTrophys] = useState<UserTrophy[] | null>(null)
  const [lockedSuccess, setLockedSuccess] = useState<Success[] | null>(null)
  const [userSuccess, setUserSuccess] = useState<UserSuccess[] | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const rarityOrder = ["Légendaire", "Épique", "Rare", "Commun"]
  const [selectedTab, setSelectedTab] = useState<"artefacts" | "trophies" | "success">("artefacts")
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const groupTrophiesByYearAndMonth = (trophies: UserTrophy[]) => {
    const groups: Record<string, Record<string, UserTrophy[]>> = {}

    for (const trophy of trophies) {
      const date = new Date(Number(trophy.date))
      if (Number.isNaN(date.getTime())) continue

      const year = date.getFullYear().toString()
      const month = date.toLocaleString("fr-FR", { month: "long" })

      if (!groups[year]) groups[year] = {}
      if (!groups[year][month]) groups[year][month] = []

      groups[year][month].push(trophy)
    }

    return groups
  }

  const groupedArtefacts = artefacts
    ? rarityOrder.map(rarity => ({
        rarity,
        artefacts: artefacts.filter(a => a.artefact.rarity === rarity),
      }))
    : []

  const getRarityImage = (rarity: string): string => {
    switch (rarity.toLowerCase()) {
      case "bronze":
        return "/images/one-star.png"
      case "silver":
        return "/images/two-star.png"
      case "gold":
        return "/images/three-star.png"
      default:
        return "/images/one-star.png"
    }
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const userFromId = await getUserById(id)
      setUser(userFromId.user)
      if (userFromId) {
        const res = await getUserArtefact(id)
        setArtefacts(res)
        const trophy = await getUserTrophy(id)
        setTrophys(trophy)
        const success = await getUserSuccess(id)
        setUserSuccess(success)
        const locked = await getUserLockedSuccess(id)
        setLockedSuccess(locked)
        setProfileImage(userFromId.user.logo_url)
      }
      setLoading(false)
    }

    void fetchData()
  }, [id])

  return (
    <div className="w-screen h-screen items-center justify-center flex">
      {!loading && (
        <div className="w-screen h-screen flex border pt-30 px-15 pb-10">
          <Image src="/profile-container.png" alt="container" fill className="absolute pt-30 px-15 pb-10" />
          <div className="w-full flex h-full p-14 gap-8 z-10">
            <div className="h-full w-[250px] bg-[#A96A3D] outline-[#5B3E29] outline-[8px] rounded-[8px] p-4 flex flex-col gap-2">
              <div className="w-full h-[30%] bg-[#FAC27D] rounded-[8px] border p-2 relative">
                <div className="w-full h-full rounded-[8px] border overflow-hidden relative">
                  <Image
                    src={
                      profileImage ??
                      "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"
                    }
                    alt="profile"
                    width={500}
                    height={500}
                    className="size-full object-cover transition duration-300"
                  />
                </div>
              </div>

              <div className="w-full grow bg-[#FAC27D] rounded-[8px] border p-2 flex flex-col gap-2 relative">
                <div className="cursor-default whitespace-pre-wrap break-words">{user?.biographie ?? "No Bio"}</div>
              </div>
            </div>
            <div className="h-full grow flex flex-col">
              <div className="relative h-[15%] ml-4 items-end gap-1 flex w-fit">
                <div className="absolute top-0 flex flex-col">
                  <span className="text-white font-lilita text-[24px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    {user?.username}
                  </span>
                  <RankDisplay xp={Number.parseInt(user?.xp ?? "")} />
                </div>

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
                          <div className="flex flex-col gap-1">
                            <h2 className="text-white font-lilita text-2xl">{rarity}</h2>
                            <div className="w-full h-[2px] bg-white rounded-full" />
                          </div>

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
                  <div className="flex flex-col gap-10 p-6">
                    {(() => {
                      const grouped = groupTrophiesByYearAndMonth(trophys || [])
                      const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))

                      return years.map(year => (
                        <div key={year} className="flex flex-col gap-6">
                          <h2 className="text-white font-lilita text-3xl border-b border-white">{year}</h2>
                          {Object.keys(grouped[year])
                            .sort((a, b) => new Date(`1 ${b} ${year}`).getTime() - new Date(`1 ${a} ${year}`).getTime())
                            .map(month => (
                              <div key={month} className="flex flex-col gap-4">
                                <h3 className="text-white font-lilita text-2xl">{month}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                  {grouped[year][month].map(trophy => (
                                    <div
                                      key={trophy.trophy_id + trophy.date}
                                      className="p-[5px] rounded-[20px] bg-[#ff9900] shadow-md"
                                    >
                                      <div className="w-full rounded-[16px] bg-gradient-to-br from-[#FAC27D] to-[#f5c249] border-[2px] border-[#333333] flex flex-col items-center justify-start p-2 h-[250px]">
                                        <div className="flex items-center justify-center flex-grow">
                                          <Image
                                            src={trophy.trophy.picture_url}
                                            alt={trophy.trophy.name}
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
                            ))}
                        </div>
                      ))
                    })()}
                  </div>
                )}

                {selectedTab === "success" && (
                  <div className="flex flex-col gap-10 p-6">
                    <div className="flex flex-col gap-4">
                      <h2 className="text-white font-lilita text-2xl">Mes Succès</h2>
                      <div className="w-full h-[2px] bg-white rounded-full" />
                      {userSuccess && userSuccess.length > 0 ? (
                        <div className="flex flex-col gap-3">
                          {userSuccess.map(success => (
                            <div
                              key={success.success_id}
                              className="bg-[#eef4fa] rounded-[16px] border-[2px] border-[#333333] px-6 py-4 text-black flex items-center justify-between"
                            >
                              <span className="font-semibold text-lg">{success.success.name}</span>
                              <Image
                                src={getRarityImage(success.success.rarity)}
                                alt={success.success.rarity}
                                width={80}
                                height={16}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-white">Aucun succès débloqué.</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-4">
                      <h2 className="text-white font-lilita text-2xl">À Débloquer</h2>
                      <div className="w-full h-[2px] bg-white rounded-full" />
                      {lockedSuccess && lockedSuccess.length > 0 ? (
                        <div className="flex flex-col gap-3">
                          {lockedSuccess.map(success => (
                            <div
                              key={success.id_firebase}
                              className="bg-[#eef4fa] rounded-[16px] border-[2px] border-[#333333] px-6 py-4 text-black flex items-center justify-between opacity-60"
                            >
                              <span className="font-semibold text-lg">{success.name}</span>
                              <Image src={getRarityImage(success.rarity)} alt={success.rarity} width={80} height={16} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-white">Tous les succès ont été débloqués</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
