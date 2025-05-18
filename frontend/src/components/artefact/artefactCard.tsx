"use client"

import type { UserArtefact } from "@/app/types/artefact"
import { mintNft } from "@/service/nft"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import clsx from "clsx"
import { type Eip1193Provider, ethers } from "ethers"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ArtefactContainer from "../container/artefact-container"
import AppModal from "../ui/AppModal"

type Props = {
  artefact: UserArtefact
  disabled?: boolean
}

declare global {
  interface Window {
    ethereum?: Eip1193Provider
  }
}

export default function ArtefactCard({ artefact, disabled = false }: Props) {
  const [showModal, setShowModal] = useState(false)
  const [status, setStatus] = useState("Transformer en NFT")
  const [state, setState] = useState<"base" | "minting" | "finish">("base")
  const [txUrl, setTxUrl] = useState("")

  const onClose = () => {
    setShowModal(false)
    setState("base")
    setStatus("Transformer en NFT")
  }

  const connectWalletAndMint = async () => {
    if (!window.ethereum) {
      toast.error("Insallation de Metamask requis", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
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
      setState("minting")
      setStatus("Envoi au serveur pour mint...")
      const result = await mintNft(account, artefact.artefact.image, artefact.id_firebase)
      setTxUrl(`https://sepolia.etherscan.io/tx/${result.hash}`)
      setStatus("NFT minté ! Clickez pour voir")
      setState("finish")
    } catch (err) {
      toast.error(`Erreur : ${err}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      setStatus("Transformer en NFT")
    }
  }

  useEffect(() => {
    if (!showModal && state === "finish") {
      toast.success("NFT minté avec succes!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
  }, [state, showModal])

  return (
    <>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        onClick={() => (disabled ? null : setShowModal(true))}
        className={clsx("p-[5px] w-[250px] hover:scale-[1.05]", {
          "cursor-pointer": !disabled,
        })}
      >
        <ArtefactContainer
          rarity={artefact.artefact.rarity}
          size="sm"
          name={artefact.artefact.name}
          description={artefact.artefact.description}
        >
          <div className="w-full flex flex-col items-center justify-start px-4 pt-[60px] pb-[40px]">
            <div className="flex items-center justify-center">
              <Image
                src={artefact.artefact.image}
                alt={artefact.artefact.name}
                width={180}
                height={180}
                className="object-cover rounded w-[200px]"
              />
            </div>
          </div>
        </ArtefactContainer>
      </div>

      {!disabled && (
        <AppModal modalIsOpen={showModal} closeModal={onClose}>
          <div className="p-6 w-[400px] min-h-[350px] flex flex-col items-center">
            {state === "minting" && (
              <div className="flex flex-col items-center gap-4 justify-center">
                <DotLottieReact
                  src="https://lottie.host/abb63194-6d93-421e-a1e4-27e831b9c490/YiDEOd2fgk.lottie"
                  loop
                  autoplay
                />
                <div className="bg-[#ff9900] text-white py-2 px-4 rounded-[16px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  {status}
                </div>
              </div>
            )}
            {state === "finish" && (
              <div className="flex flex-col items-center gap-4 justify-center">
                <DotLottieReact
                  src="https://lottie.host/47680af7-963d-47b8-b2ec-a6f08f6aa0c4/7EMUBqU4oW.lottie"
                  autoplay
                />
                <a
                  href={txUrl}
                  target="_blank"
                  className="bg-[#ff9900] text-white py-2 px-4 rounded-[16px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] truncate"
                  rel="noreferrer"
                >
                  {status}
                </a>
              </div>
            )}
            {state === "base" && (
              <>
                <h3 className="text-xl font-bold mb-4">{artefact.artefact.name}</h3>
                <Image
                  src={artefact.artefact.image}
                  alt={artefact.artefact.name}
                  width={200}
                  height={200}
                  className="object-cover rounded mb-4"
                />
                <button
                  onClick={connectWalletAndMint}
                  className="bg-[#ff9900] text-white py-2 px-4 rounded cursor-pointer"
                >
                  {status}
                </button>
              </>
            )}
          </div>
        </AppModal>
      )}
    </>
  )
}
