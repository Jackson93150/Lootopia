import { schemaAuction } from "@/lib/zod/schemas"
import { getUserArtefact } from "@/service/artefacts"
import { createAuction } from "@/service/sales-hotel"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"
import type { z } from "zod"
import OwnArtefactModal from "./own-artefact-modal"

type FormValues = z.infer<typeof schemaAuction>

export type OwnArtefact = {
  id_artefact: string
  id_firebase: string
  id_user: string
  auction: boolean
  is_saled: boolean
  id_exported_nft: boolean
  artefact: {
    description: string
    name: string
    event: string | null
    fusionnable: boolean
    image: string
    rarity: string
    type: string
  }
}

export default function OwnArtefacts() {
  const [ownArtefacts, setOwnArtefacts] = useState<OwnArtefact[]>([])
  const [selectedOwnArtefact, setSelectedOwnArtefact] = useState<OwnArtefact | null>(null)
  const [modalIsOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
    setSelectedOwnArtefact(null)
  }


  // ----- ZOD -------
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaAuction),
    defaultValues: {
      fix_price: null,
      direct_sale: false,
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const { fix_price, auction_price, direct_sale, timer } = values
      if (selectedOwnArtefact) {
        console.log(selectedOwnArtefact)
        const userArtefactId = selectedOwnArtefact.id_firebase

        await createAuction(
          userArtefactId,
          fix_price,
          auction_price,
          direct_sale,
          timer,
          selectedOwnArtefact.artefact.name,
          selectedOwnArtefact.artefact.rarity,
          selectedOwnArtefact.artefact.image,
        )

        toast.success("Mise en vente réussi", {
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
    } catch (error) {
      const err = error as Error
      toast.error(err.message, {
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
  }

  const onInvalid = (errors: typeof formState.errors) => {
    Object.values(errors).forEach(error => {
      if (error?.message) {
        toast.error(error.message, {
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
    })
  }

  // ----- ZOD -------

  useEffect(() => {
    async function fetchOwnArtefacts() {
      try {
        const data = await getUserArtefact()

        setOwnArtefacts(data)
      } catch (error) {
        console.error("Erreur lors de la récupération des artefacts :", error)
      }
    }
    fetchOwnArtefacts()
  }, [])

  return (
    <>
      <div className="grid grid-cols-4 gap-1 pointer">
        {ownArtefacts.map((ownArtefact, index) => (
          <div
            key={index}
            className="cursor-pointer rounded bg-gradient-to-br from-[#FAC27D] to-[#f5c249] py-1 border-[2px] border-[#5B3E29]"
            onClick={() => {
              setIsOpen(true)
              setSelectedOwnArtefact(ownArtefact)
            }}
          >
            <Image src={ownArtefact.artefact.image} width={75} height={75} alt="artefact" />
          </div>
        ))}
      </div>
      <OwnArtefactModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        selectedOwnArtefact={selectedOwnArtefact}
        registerForm={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        onInvalid={onInvalid}
        watch={watch}
        setValue={setValue}
      />
      <ToastContainer position="bottom-right" theme="colored" limit={2} stacked />
    </>
  )
}
