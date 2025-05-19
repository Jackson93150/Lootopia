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
import PageContainer from "../container/page-container"
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
          <PageContainer color="white" size="sm">
            <div className="mx-12 my-4 w-[300px] gap-8 h-fit flex flex-col items-center">
              {state === "minting" && (
                <div className="flex flex-col items-center gap-4 justify-center">
                  <DotLottieReact
                    src="https://lottie.host/abb63194-6d93-421e-a1e4-27e831b9c490/YiDEOd2fgk.lottie"
                    loop
                    autoplay
                  />
                  <div className="bg-gradient-to-t from-[#F38424] to-[#F7C929] py-2 px-4 rounded-[12px]">
                    <span className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{status}</span>
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
                    className="bg-gradient-to-t from-[#F38424] to-[#F7C929] py-2 px-4 rounded-[12px] outline-[2px] truncate"
                    rel="noreferrer"
                  >
                    <span className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{status}</span>
                  </a>
                </div>
              )}
              {state === "base" && (
                <>
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
                  <button
                    onClick={connectWalletAndMint}
                    className="bg-gradient-to-t from-[#F38424] to-[#F7C929] py-2 px-4 rounded-[12px] cursor-pointer outline-[2px]"
                  >
                    <span className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{status}</span>
                  </button>
                </>
              )}
            </div>
          </PageContainer>
        </AppModal>
      )}
    </>
  )
}
