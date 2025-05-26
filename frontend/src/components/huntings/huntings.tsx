import type { User } from "@/app/types/user"
import { useState } from "react"
import PageContainer from "../container/page-container"
import CreateHunting from "./modals/create-hunting"

type HuntingsProps = {
  user: User | null
  id: string | null
}

export default function Huntings({ user, id }: HuntingsProps) {
  const [showCreateHuntingModal, setShowCreateHuntingModal] = useState(false)
  const [stepCreateHunting, setStepCreateHunting] = useState<number>(0)

  const onClose = () => {
    setShowCreateHuntingModal(false)
    setStepCreateHunting(0)
  }

  return (
    <div className="relative items-center flex-col h-full w-full">
      <PageContainer size="sm" color="brown">
        <div className="flex h-full w-full">
          <div className="flex w-full h-fit items-center justify-center">
            <span className="text-3xl font-bolder text-white py-4 font-lilita uppercase drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              Chasses
            </span>
            <button
              className="absolute right-5 h-[40px] px-4 py-1 rounded-[8px] outline-[2px] cursor-pointer border-[2px] border-[#F65F26]/70 bg-gradient-to-b from-[#E9721E] to-[#F29D25]"
              onClick={() => setShowCreateHuntingModal(true)}
            >
              <span className="stroke-1 font-lilita text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                Créer une chasse
              </span>
            </button>
          </div>
        </div>
      </PageContainer>
      <CreateHunting
        userId={id}
        showModal={showCreateHuntingModal}
        onClose={onClose}
        setStepCreateHunting={setStepCreateHunting}
        stepCreateHunting={stepCreateHunting}
      />
    </div>
  )
}
