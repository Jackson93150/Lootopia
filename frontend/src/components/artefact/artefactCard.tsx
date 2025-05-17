"use client"

import type { UserArtefact } from "@/app/types/artefact"
import { mintNft } from "@/service/nft"
import { type Eip1193Provider, ethers } from "ethers"
import Image from "next/image"
import { useState } from "react"

type Props = {
  artefact: UserArtefact
}

declare global {
  interface Window {
    ethereum?: Eip1193Provider
  }
}

export default function ArtefactCard({ artefact }: Props) {
  const [showModal, setShowModal] = useState(false)
  const [status, setStatus] = useState("")

  const connectWalletAndMint = async () => {
    if (!window.ethereum) {
      alert("Installe MetaMask !")
      return
    }

    try {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      setStatus("Signature en cours...")

      const message = `Mint artefact ${artefact.id_artefact}`
      await signer.signMessage(message)

      setStatus("Envoi au serveur pour mint...")

      const result = await mintNft(account, artefact.artefact.image, artefact.id_firebase)

      setStatus(`NFT minté avec succès ! Tx : ${result.txHash}`)
    } catch (err) {
      console.error(err)
      setStatus(`Erreur : ${err}`)
    }
  }

  return (
    <>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div onClick={() => setShowModal(true)} className="p-[5px] rounded-[20px] bg-[#ff9900] shadow-md cursor-pointer">
        <div className="w-full rounded-[16px] bg-gradient-to-br from-[#FAC27D] to-[#f5c249] border-[2px] border-[#333333] flex flex-col items-center justify-start p-2 h-[250px]">
          <div className="w-full text-center text-md font-bold truncate font-lilita text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)]">
            {artefact.artefact.name}
          </div>
          <div className="flex items-center justify-center flex-grow">
            <Image
              src={artefact.artefact.image}
              alt={artefact.artefact.name}
              width={180}
              height={180}
              className="object-cover rounded"
            />
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/10 bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-[400px] flex flex-col items-center">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-4">{artefact.artefact.name}</h3>
            <Image
              src={artefact.artefact.image}
              alt={artefact.artefact.name}
              width={200}
              height={200}
              className="object-cover rounded mb-4"
            />
            <button onClick={connectWalletAndMint} className="bg-[#ff9900] text-white py-2 px-4 rounded">
              Transformer en NFT
            </button>
            <p className="text-sm mt-3 text-center">{status}</p>
          </div>
        </div>
      )}
    </>
  )
}
