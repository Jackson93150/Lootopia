"use client"

import PageContainer from "@/components/container/page-container"
import Leaderboard from "@/components/leaderboard/leaderboard"

export default function LeaderboardPage() {
  return (
    <div className="w-screen h-screen flex pt-40 px-15 pb-10">
      <PageContainer stripes>
        <div className="z-20 flex flex-col lg:flex-row items-center justify-between p-4 gap-5 h-full w-full">
          <Leaderboard />
        </div>
      </PageContainer>
    </div>
  )
}
