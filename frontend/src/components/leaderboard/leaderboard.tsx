import type { UserWithId } from "@/app/types/user"
import { getUsersXp } from "@/service/rewards"
import { useEffect, useState } from "react"
import PageContainer from "../container/page-container"
import MonthlyCountdownTimer from "../timer/contdown"
import Cell from "./cell"

export default function Leaderboard() {
  const [user, setUser] = useState<UserWithId[]>()

  useEffect(() => {
    async function fetchLeaderboard() {
      const data = await getUsersXp()
      setUser(data)
    }

    fetchLeaderboard()
  }, [])
  return (
    <div className="relative items-center flex-col h-full w-full">
      <PageContainer size="sm" color="brown">
        <div className="flex flex-col items-center h-full w-full">
          <div className="flex w-full items-center justify-center">
            <span className="text-3xl font-bolder text-white py-4 font-lilita uppercase drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              Leaderboard
            </span>
            <div className="absolute right-[20px]">
              <MonthlyCountdownTimer />
            </div>
          </div>

          <div className="w-[95%] flex flex-col lg:flex-row items-center">
            <div className="flex flex-col w-full min-h-0 max-h-[80vh]">
              <div className="w-full flex flex-col p-2 mt-4 items-center gap-4 flex-grow overflow-y-auto">
                {user?.map((user, index) => (
                  <Cell key={`cell1-${user.id_user}-${index}`} user={user} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
