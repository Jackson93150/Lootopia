'use client'
import OwnArtefacts from "./components/own-artefacts";
import SalesHotel from "./components/sales-hotel";


export default function SaleHotelPage() {
  return (
    <div className="py-0 h-screen w-full bg-[url('/images/backgrounds/backgroundAuth.png')]">
      <div className="flex size-full justify-center items-center">
        <div className="flex flex-row items-center justify-between p-4 gap-5 rounded-lg h-[80%] w-[85%] bg-gradient-to-r from-[#F38424] to-[#F7C929] border-4 border-[#F2E30B]">
          <Inventory />
          <SalesHotel />
        </div>
      </div>
    </div>
  )
}

function Inventory() {
  return (
    <div className="items-center flex-col flex bg-[#A96A3D] h-[100%] w-[40%] rounded-lg border-4 border-[#5B3E29]">
      <div className="flex flex-col items-center h-full w-full">
        <div className="text-center py-5 border-bottom-2 w-full">
          <span className="text-3xl font-bold text-white">Inventaire</span>
        </div>
        <OwnArtefacts />
      </div>
    </div>
  )
}