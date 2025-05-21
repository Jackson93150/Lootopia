"use client"

import PageContainer from "@/components/container/page-container"
import { useUser } from "@/context/userContext"
import SalesHotel from "../../../components/sales-hotel/sales-hotel"

export default function SaleHotelPage() {
  const { user, id } = useUser()

  return (
    <div className="w-screen h-screen flex pt-40 px-15 pb-10">
      <PageContainer stripes>
        <div className="z-20 flex flex-col lg:flex-row items-center justify-between p-4 gap-5 h-full w-full">
          <SalesHotel user={user} id={id} />
        </div>
      </PageContainer>
    </div>
  )
}
