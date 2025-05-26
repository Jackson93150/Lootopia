"use client"

import PageContainer from "@/components/container/page-container"
import Huntings from "@/components/huntings/huntings"
import { useUser } from "@/context/userContext"

export default function HuntingsPage() {
  const { user, id } = useUser()

  return (
    <div className="w-screen h-screen flex pt-40 px-15 pb-10">
      <PageContainer stripes>
        <div className="z-20 flex flex-col lg:flex-row items-center justify-between p-4 gap-5 h-full w-full">
          <Huntings user={user} id={id} />
        </div>
      </PageContainer>
    </div>
  )
}
