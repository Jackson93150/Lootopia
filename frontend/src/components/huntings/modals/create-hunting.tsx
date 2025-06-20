import PageContainer from "@/components/container/page-container"
import AppModal from "@/components/ui/AppModal"
import { type Dispatch, type SetStateAction, useEffect, useState } from "react"
import OneStep from "./steps/one-step"
import SecondStep from "./steps/second-step"
import ThirdStep from "./steps/third-step"
import { createHunt, updateHunt } from "@/service/huntings"

type Hunting = {
  id: string
  title: string
  description: string
  type: "RA" | "carte"
  is_public: boolean
  fees: number
  participants_limit: number
  latitude: string
  longitude: string
  start_date: number
  end_date: number
  indices: string[]
  enigmes: string[]
  is_draft: boolean
}

type CreateHuntingProps = {
  userId: string | null
  showModal: boolean
  onClose: () => void
  stepCreateHunting: number
  setStepCreateHunting: Dispatch<SetStateAction<number>>
  editingHunt?: Hunting | null
}

export default function CreateHunting({
                                        userId,
                                        showModal,
                                        onClose,
                                        stepCreateHunting,
                                        setStepCreateHunting,
                                        editingHunt = null,
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
  const [state] = useState<boolean>(true)

  useEffect(() => {
    if (!editingHunt) return

    setTitle(editingHunt.title)
    setDescription(editingHunt.description)
    setType(editingHunt.type)
    setIsPublic(editingHunt.is_public)
    setFees(editingHunt.fees)
    setLimitParticipant(editingHunt.participants_limit)
    setLatitude(Number(editingHunt.latitude))
    setLongitude(Number(editingHunt.longitude))
    setStartedAt(editingHunt.start_date)
    setEndedAt(editingHunt.end_date)
    setIndices(editingHunt.indices ?? [""])
    setEnigmes(editingHunt.enigmes ?? [])
  }, [editingHunt])

  const resetForm = () => {
    setTitle(null)
    setDescription(null)
    setType(undefined)
    setIsPublic(true)
    setFees(null)
    setLimitParticipant(null)
    setLatitude(null)
    setLongitude(null)
    setStartedAt(null)
    setEndedAt(null)
    setIndices([""])
    setEnigmes([])
    setStepCreateHunting(0)
  }

  const handleSubmit = async (isDraft = false) => {
    if (!isDraft && (!title || !description || !type || latitude == null || longitude == null || startedAt == null || endedAt == null)) {
      alert("Certains champs obligatoires sont manquants")
      return
    }

    if (!userId) {
      alert("Utilisateur non identifié")
      return
    }

    const payload = {
      userId,
      title: title ?? "",
      description: description ?? "",
      type: type ?? "carte",
      isPublic,
      feed,
      limitParticipant,
      latitude: latitude ?? 0,
      longitude: longitude ?? 0,
      startedAt: startedAt ?? Date.now(),
      endedAt: endedAt ?? Date.now() + 86400000,
      indices,
      enigmes,
      state,
      is_draft: isDraft,
    }

    try {
      const result = editingHunt
          ? await updateHunt(editingHunt.id, payload)
          : await createHunt(payload)

      if (isDraft) resetForm()
      console.log("Chasse sauvegardée :", result)
      onClose()
      window.location.reload()
    } catch (e) {
      console.error(e)
      alert("Erreur lors de la sauvegarde de la chasse.")
    }
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
                  handleSubmit={handleSubmit}
              />
          )}
          {stepCreateHunting == 1 && (
              <SecondStep
                  setLongitude={setLongitude}
                  setLatitude={setLatitude}
                  longitude={longitude}
                  latitude={latitude}
                  setStepCreateHunting={setStepCreateHunting}
                  handleSubmit={handleSubmit}
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
