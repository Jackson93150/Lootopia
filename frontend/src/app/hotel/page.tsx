"use client"

import PageContainer from "@/components/container/page-container"
import SalesHotel from "../../components/sales-hotel/sales-hotel"
import { useMe } from "../hook/useMe"

export default function SaleHotelPage() {
  const { user, id } = useMe()

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
