"use client"

import PageContainer from "@/components/container/page-container"
import SalesHotel from "../../components/sales-hotel/sales-hotel"
import { useMe } from "../hook/useMe"

export default function SaleHotelPage() {
  const { user, id } = useMe()

  return (
    <>
      <PageContainer stripes className="translate-y-[4vh]">
        <div className="z-20 flex flex-col lg:flex-row items-center justify-between p-4 gap-5 rounded-lg h-[70vh] w-[85vw]">
          {/* <Inventory user={user} id={id} /> */}
          <SalesHotel user={user} id={id} />
        </div>
      </PageContainer>
    </>
  )
}
