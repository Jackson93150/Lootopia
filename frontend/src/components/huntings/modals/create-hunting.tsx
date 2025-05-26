import PageContainer from "@/components/container/page-container"
import AppModal from "@/components/ui/AppModal"
import { type Dispatch, type SetStateAction, useState } from "react"
import OneStep from "./steps/one-step"
import SecondStep from "./steps/second-step"
import ThirdStep from "./steps/third-step"

type CreateHuntingProps = {
  userId: string | null
  showModal: boolean
  onClose: () => void
  stepCreateHunting: number
  setStepCreateHunting: Dispatch<SetStateAction<number>>
}

export default function CreateHunting({
  userId,
  showModal,
  onClose,
  stepCreateHunting,
  setStepCreateHunting,
}: CreateHuntingProps) {
  const [title, setTitle] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [type, setType] = useState<"RA" | "carte">()
  const [isPublic, setIsPublic] = useState<boolean>(true)
  const [feed, setFees] = useState<number | null>(null)
  const [limitParticipant, setLimitParticipant] = useState<number | null>(null)
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [endedAt, setEndedAt] = useState<number | null>(null)
  const [indices, setIndices] = useState([""])
  const [enigmes, setEnigmes] = useState([])

  const handleSubmit = () => {
    const payload = {
      title,
      description,
      type,
      isPublic,
      feed,
      limitParticipant,
      latitude,
      longitude,
      startedAt: startedAt,
      endedAt,
      indices,
      enigmes,
      userId: userId,
    }

    console.log(payload)
  }

  return (
    <AppModal modalIsOpen={showModal} closeModal={onClose}>
      <PageContainer color="grey" size="sm">
        {stepCreateHunting == 0 && (
          <OneStep
            setStepCreateHunting={setStepCreateHunting}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            type={type}
            setType={setType}
            isPublic={isPublic}
            setIsPublic={setIsPublic}
            feed={feed}
            setFees={setFees}
            limitParticipant={limitParticipant}
            setLimitParticipant={setLimitParticipant}
            startedAt={startedAt}
            setStartedAt={setStartedAt}
            endedAt={endedAt}
            setEndedAt={setEndedAt}
          />
        )}
        {stepCreateHunting == 1 && (
          <SecondStep
            setLongitude={setLongitude}
            setLatitude={setLatitude}
            longitude={longitude}
            latitude={latitude}
            setStepCreateHunting={setStepCreateHunting}
          />
        )}

        {stepCreateHunting == 2 && (
          <ThirdStep
            enigmes={enigmes}
            setEnigmes={setEnigmes}
            indices={indices}
            setIndices={setIndices}
            setStepCreateHunting={setStepCreateHunting}
            handleSubmit={handleSubmit}
          />
        )}
      </PageContainer>
    </AppModal>
  )
}
