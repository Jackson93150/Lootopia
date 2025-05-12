import type { UserArtefact } from "@/app/types/artefact"
import { toastError, toastSuccess } from "@/components/ui/Toast"
import { schemaAuction } from "@/lib/zod/schemas"
import { getUserArtefact } from "@/service/rewards"
import { createAuction } from "@/service/sales-hotel"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import OwnArtefactModal from "./own-artefact-modal"

type FormValues = z.infer<typeof schemaAuction>

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function OwnArtefacts({ user }: any) {
  const [ownArtefacts, setOwnArtefacts] = useState<UserArtefact[]>([])
  const [selectedOwnArtefact, setSelectedOwnArtefact] = useState<UserArtefact | null>(null)
  const [modalIsOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
    setSelectedOwnArtefact(null)
  }

  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
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
        const userArtefactId = selectedOwnArtefact.id_firebase

        await createAuction(
          userArtefactId,
          selectedOwnArtefact.artefact.id_firebase,
          user.email,
          fix_price,
          auction_price,
          direct_sale,
          timer,
          selectedOwnArtefact.artefact.name,
          selectedOwnArtefact.artefact.rarity,
          selectedOwnArtefact.artefact.image,
        )

        setOwnArtefacts(prev => prev.filter(a => a.id_firebase !== selectedOwnArtefact.id_firebase))
        closeModal()

        toastSuccess("Mise en vente réussi")
      }
    } catch (error) {
      const err = error as Error
      toastError(err.message)
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const onInvalid = (errors: Record<string, any>) => {
    // biome-ignore lint/complexity/noForEach: <explanation>
    Object.values(errors).forEach(error => {
      if (error?.message) {
        toastError(error?.message)
      }
    })
  }

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
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
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
      {selectedOwnArtefact && (
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
      )}
    </>
  )
}
