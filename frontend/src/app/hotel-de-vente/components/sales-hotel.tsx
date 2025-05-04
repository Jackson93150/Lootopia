import { useEffect, useState } from "react";
import { getAllSales } from "@/service/sales-hotel";
import Image from "next/image";
import AppButton from "@/components/ui/AppButton";

export default function SalesHotel() {
    const [sales, setSales] = useState([]);
  
    useEffect(() => {
      async function fetchSales() {
        try {
          const data = await getAllSales();
  
          console.log(data)
  
          setSales(data);
        } catch (error) {
          console.error("Erreur lors de la récupération des artefacts :", error);
        }
      }
      fetchSales();
    }, []);
    
    return (
      <div className="items-center flex-col flex bg-[#A96A3D] h-[100%] w-full rounded-lg border-4 border-[#5B3E29]">
        <div className="flex flex-col items-center h-full w-full">
          <div className="flex justify-around text-center py-5 border-bottom-2 w-full">
            {/* <span className="text-2xl font-bold text-white">Achat</span> */}
            <span className="text-3xl font-bold text-white">Hotel de vente</span>
            {/* <span className="text-2xl font-bold text-white">Vente</span> */}
          </div>
          {
            sales.map((sale, index) => (
              <div key={index} className="w-full flex items-center justify-between px-2 bg-opacity-80">
                <Image
                  src={sale.artefact.image}
                  width={60}
                  height={60}
                  alt={'Artefact'}
                />
                <p className="text-xl font-bolder text-white">Type : {sale.artefact.type}</p>
                <p className="text-xl font-bolder text-white">Rareté : {sale.artefact.rarity}</p>
                <div className="flex items-center gap-1">
                  <p className="text-xl font-bolder text-white">{sale.crown_price}</p>
                  <Image src={'/images/couronnes.png'} width={40} height={40} alt="Couronnes"/>
                </div>
                <AppButton className="!w-30">Acheter</AppButton>
              </div>
            ))
        }
        </div>
      </div>
    )
  }