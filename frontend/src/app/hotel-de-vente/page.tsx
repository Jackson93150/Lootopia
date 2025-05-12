"use client"
import { ToastContainer } from "react-toastify"
import { useMe } from "../hook/useMe"
import OwnArtefacts from "./components/inventory/own-artefacts"
import SalesHotel from "./components/sales-hotel/sales-hotel"

export default function SaleHotelPage() {
  const { user } = useMe()

  return (
    <>
      <div className="py-0 h-screen w-full bg-[url('/images/backgrounds/backgroundAuth.png')] font-lilita">
        <div className="flex size-full justify-center items-center">
          <div className="flex flex-col lg:flex-row items-center justify-between p-4 gap-5 rounded-lg h-[80%] w-[85%] bg-gradient-to-r from-[#F38424] to-[#F7C929] border-4 border-[#F2E30B]">
            <Inventory user={user} />
            <SalesHotel user={user} />
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" theme="colored" limit={2} stacked />
    </>
  )
}

function Inventory({ user }: any) {
  return (
    <div className="items-center flex-col flex bg-[#A96A3D] h-[100%] w-[100%] lg:w-[40%] rounded-lg border-4 border-[#5B3E29]">
      <div className="flex flex-col items-center h-full w-full">
        <div className="text-center py-5 border-bottom-2 w-full">
          <span className="text-3xl font-bolder text-white">Inventaire</span>
        </div>
        <OwnArtefacts user={user} />
      </div>
    </div>
  )
}
