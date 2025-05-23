"use client"

import PageContainer from "@/components/container/page-container"
import ArtefactView from "@/components/profile/artefact-view"
import ProfileView from "@/components/profile/profile-view"
import SuccessView from "@/components/profile/succes-view"
import TrophysView from "@/components/profile/trophies-view"
import { RankDisplay } from "@/components/ui/RankDisplay"
import { useUser } from "@/context/userContext"
import { getUserArtefact, getUserLockedSuccess, getUserSuccess, getUserTrophy } from "@/service/rewards"
import { useEffect, useState } from "react"
import type { UserArtefact } from "../../types/artefact"
import type { Success, UserSuccess } from "../../types/success"
import type { UserTrophy } from "../../types/trophy"

export default function ProfilePage() {
  const [artefacts, setArtefacts] = useState<UserArtefact[] | null>(null)
  const [artefactsExported, setArtefactsExported] = useState<UserArtefact[] | null>(null)
  const [trophys, setTrophys] = useState<UserTrophy[] | null>(null)
  const [lockedSuccess, setLockedSuccess] = useState<Success[] | null>(null)
  const [userSuccess, setUserSuccess] = useState<UserSuccess[] | null>(null)
  const [loading, setLoading] = useState(false)
  const { user, id } = useUser()
  const [selectedTab, setSelectedTab] = useState<"artefacts" | "trophies" | "success">("artefacts")
  const [profileImage, setProfileImage] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (user && id) {
        setLoading(true)
        const res = await getUserArtefact(id)
        setArtefacts(res)
        const exported = await getUserArtefact(id, {
          is_exported_nft: true,
        })
        setArtefactsExported(exported)
        const trophy = await getUserTrophy(id)
        setTrophys(trophy)
        const success = await getUserSuccess(id)
        setUserSuccess(success)
        const locked = await getUserLockedSuccess(id)
        setLockedSuccess(locked)
        setProfileImage(user.logo_url)
        setLoading(false)
      }
    }

    void fetchData()
  }, [user, id])

  return (
    <div className="w-screen h-screen items-center justify-center flex">
      <div className="w-screen h-screen flex pt-40 px-15 pb-10">
        <PageContainer stripes>
          <div className="w-full flex h-full p-4 gap-8 z-10">
            <ProfileView user={user} profileImage={profileImage} setProfileImage={setProfileImage} loading={loading} />
            <div className="h-full grow flex flex-col">
              <div className="relative h-[100px] ml-5 gap-1 flex flex-shrink-0 w-fit">
                <RankDisplay user={user} />
              </div>
              <div className="relative h-fit ml-5 gap-1 flex w-fit">
                {[
                  { label: "Artefacts", key: "artefacts" },
                  { label: "Trophées", key: "trophies" },
                  { label: "Succès", key: "success" },
                ].map(({ label, key }) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTab(key as typeof selectedTab)}
                    className={`h-[40px] px-4 py-1 rounded-[8px] outline-[2px] cursor-pointer border-[2px] border-[#415E6F] bg-gradient-to-b from-[#6998B3] to-[#547585] ${
                      selectedTab === key ? "brightness-100" : "brightness-75"
                    }`}
                  >
                    <span className="stroke-1 font-lilita text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                      {label}
                    </span>
                  </button>
                ))}
              </div>
              <PageContainer
                color="grey"
                size="sm"
                className="flex flex-col h-full min-h-0"
                innerClassName="-translate-y-3 translate-x-[8px]"
              >
                <div className="z-10 grow overflow-y-auto flex flex-col gap-10 p-6 min-h-0">
                  {selectedTab === "artefacts" && (
                    <ArtefactView artefacts={artefacts} artefactsExported={artefactsExported} loading={loading} />
                  )}

                  {selectedTab === "trophies" && <TrophysView trophys={trophys} />}

                  {selectedTab === "success" && <SuccessView lockedSuccess={lockedSuccess} userSuccess={userSuccess} />}
                </div>
              </PageContainer>
            </div>
          </div>
        </PageContainer>
      </div>
    </div>
  )
}
