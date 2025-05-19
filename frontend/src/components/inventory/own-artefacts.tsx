import type { UserArtefact } from "@/app/types/artefact"
import type { User } from "@/app/types/user"
import { toastError, toastSuccess } from "@/components/ui/Toast"
import { schemaAuction } from "@/lib/zod/schemas"
import { getUserArtefact } from "@/service/rewards"
import { createAuction } from "@/service/sales-hotel"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useState } from "react"
import { type FieldErrors, useForm } from "react-hook-form"
import type { z } from "zod"
import ArtefactContainer from "../container/artefact-container"
import PageContainer from "../container/page-container"
import AppButton from "../ui/AppButton"
import AppInput from "../ui/AppInput"
import AppSelect from "../ui/AppSelect"

type FormValues = z.infer<typeof schemaAuction>

type OwnArtefactProps = {
  user: User | null
  id: string | null
  onClose: () => void
}

export default function OwnArtefacts({ user, id, onClose }: OwnArtefactProps) {
  const [ownArtefacts, setOwnArtefacts] = useState<UserArtefact[]>([])
  const [selectedOwnArtefact, setSelectedOwnArtefact] = useState<UserArtefact | null>(null)

  function closeModal() {
    onClose()
    setSelectedOwnArtefact(null)
  }

  const { register, handleSubmit } = useForm<FormValues>({
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

        if (user) {
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
        }

        setOwnArtefacts(prev => prev.filter(a => a.id_firebase !== selectedOwnArtefact.id_firebase))
        closeModal()

        toastSuccess("Mise en vente réussi")
      }
    } catch (error) {
      const err = error as Error
      toastError(err.message)
    }
  }

  const onInvalid = (errors: FieldErrors<FormValues>) => {
    Object.values(errors).forEach(error => {
      if (error?.message) {
        toastError(error?.message)
      }
    })
  }

  useEffect(() => {
    async function fetchOwnArtefacts() {
      try {
        const data = await getUserArtefact(id ?? "")

        setOwnArtefacts(data)
      } catch (error) {
        console.error("Erreur lors de la récupération des artefacts :", error)
      }
    }
    fetchOwnArtefacts()
  }, [id])

  return (
    <>
      <div className="w-full flex justify-center">
        <span className="text-white font-lilita drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-[32px]">
          Inventaire
        </span>
      </div>

      <div className="w-full h-[55%] md:h-[70%] py-4 px-2">
        <PageContainer size="sm" color="white">
          <div className="w-full overflow-y-auto grid grid-cols-1 md:grid-cols-2 0-5xl:grid-cols-3 2-4xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-6 pointer">
            {ownArtefacts.map((ownArtefact, index) => (
              <div
                key={index}
                className={clsx("w-[250px] h-[350px] p-[5px] transition-all", {
                  "brightness-100": ownArtefact.id_firebase === selectedOwnArtefact?.id_firebase,
                  "brightness-40 hover:brightness-100 cursor-pointer":
                    ownArtefact.id_firebase !== selectedOwnArtefact?.id_firebase,
                })}
                onClick={() => {
                  setSelectedOwnArtefact(ownArtefact)
                }}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    setSelectedOwnArtefact(ownArtefact)
                  }
                }}
              >
                <ArtefactContainer
                  rarity={ownArtefact.artefact.rarity}
                  size="sm"
                  name={ownArtefact.artefact.name}
                  description={ownArtefact.artefact.description}
                >
                  <div className="w-full flex flex-col items-center justify-start px-4 pt-[60px] pb-[40px]">
                    <div className="flex items-center justify-center">
                      <Image
                        src={ownArtefact.artefact.image}
                        alt={ownArtefact.artefact.name}
                        width={180}
                        height={180}
                        className="object-cover rounded w-[200px]"
                      />
                    </div>
                  </div>
                </ArtefactContainer>
              </div>
            ))}
          </div>
        </PageContainer>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="w-full flex flex-shrink-0 flex-col justify-center items-center"
      >
        <div className="flex flex-col md:flex-row items-center gap-2 mb-2 w-full justify-around">
          <div className="flex flex-col gap-1">
            <AppInput
              type="number"
              id="auction_price"
              placeholder="Prix d'enchère de départ"
              className="!w-45"
              {...register("auction_price", { valueAsNumber: true })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <AppSelect id="timer" {...register("timer")}>
              <option value="">-- Choisissez une durée --</option>
              <option value="1h">1 heure</option>
              <option value="1d">1 jour</option>
              <option value="1w">1 semaine</option>
            </AppSelect>
          </div>

          <div className="flex flex-col gap-1">
            <AppInput
              type="number"
              id="fix_price"
              placeholder="Prix d'achat direct"
              className="!w-45"
              {...register("fix_price", { valueAsNumber: true })}
            />
          </div>
        </div>

        <AppButton
          type="submit"
          className="!w-50 !mt-2 !text-center bg-gradient-to-t from-[#F38424] to-[#F7C929] py-2 px-4 rounded-[12px] cursor-pointer outline-[2px]"
        >
          <span className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-[18px]">Vendre</span>
        </AppButton>
      </form>
    </>
  )
}
