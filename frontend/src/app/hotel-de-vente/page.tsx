'use client'
import AppButton from "@/components/ui/AppButton";
import { getAllArtefacts, getUserArtefact } from "@/service/artefacts";
import Image from "next/image";
import { useEffect, useState } from "react";

// const ownArtefacts = {
//     artefacts: [
//       {
//         nom: "Étoile Mystique",
//         description: "Augmente vos chances de succès.",
//         type: "Carte",
//         enchere: false,
//         rarete: "Rare",
//         event: null,
//         valeur_enchere: null,
//         crown_price: 41,
//         fusionnable: null,
//         is_exported_in_nft: false,
//         image: '/images/cards/carte_rare_transparent.png',
//       },
//       {
//         nom: "Lame du Destin",
//         description: "Débloque des chemins cachés.",
//         type: "Carte",
//         enchere: false,
//         rarete: "Épique",
//         event: null,
//         valeur_enchere: null,
//         crown_price: 75,
//         fusionnable: null,
//         is_exported_in_nft: false,
//         image: '/images/cards/carte_epique_transparent.png',
//       },
//       {
//         nom: "Couronne Éternelle",
//         description: "Confère des pouvoirs légendaires.",
//         type: "Carte",
//         enchere: false,
//         rarete: "Légendaire",
//         event: null,
//         valeur_enchere: null,
//         crown_price: 195,
//         fusionnable: null,
//         is_exported_in_nft: false,
//         image: '/images/cards/carte_legendaire_transparent.png',
//       },
//       {
//         nom: "Bouclier Brisé",
//         description: "Protège des pièges.",
//         type: "Carte",
//         enchere: false,
//         rarete: "Commun",
//         event: null,
//         valeur_enchere: null,
//         crown_price: 3,
//         fusionnable: null,
//         is_exported_in_nft: false,
//         image: '/images/cards/carte_commun_transparent.png',
//       },
//     ],
//   };
  
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

function SalesHotel() {
  return (
    <div className="items-center flex-col flex bg-[#A96A3D] h-[100%] w-full rounded-lg border-4 border-[#5B3E29]">
      <div className="flex flex-col items-center h-full w-full">
        <div className="flex justify-around text-center py-5 border-bottom-2 w-full">
          {/* <span className="text-2xl font-bold text-white">Achat</span> */}
          <span className="text-3xl font-bold text-white">Hotel de vente</span>
          {/* <span className="text-2xl font-bold text-white">Vente</span> */}
        </div>
      </div>
    </div>
  )
}

function OwnArtefacts() {
    const [ownArtefacts, setOwnArtefacts] = useState([])

    useEffect(() => {
        async function fetchOwnArtefacts() {
            try {
                const data = await getUserArtefact()
                setOwnArtefacts(data)
                console.log(data)
              } catch (error) {
                console.error("Erreur lors de la récupération des crown packages :", error)
              }
        }
        fetchOwnArtefacts()
    }, [])

    return (
        <div className="grid grid-cols-4 gap-1 pointer">
            {
                ownArtefacts ?? ownArtefacts.artefacts.map((artefact, index) => (
                    <button key={index} type="button" className="cursor-pointer">
                        <div key={index} className="border-1 border-[#F2E30B] rounded bg-gradient-to-r from-[#F38424] to-[#F7C929]">
                            <Image src={`${artefact.image}`} width={75} height={75} alt="artefact"/>
                        </div>
                    </button>
                ))
            }
        </div>
    )
}
