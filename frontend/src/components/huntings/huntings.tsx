import type { User } from "@/app/types/user"
import { useEffect, useState } from "react"
import PageContainer from "../container/page-container"
import CreateHunting from "./modals/create-hunting"
import { fetchBack } from "@/utils/fetch"

export type Hunting = {
  id: string
  title: string
  description: string
  type: "RA" | "carte"
  is_public: boolean
  fees: number | null
  participants_limit: number | null
  latitude: number | string
  longitude: number | string
  start_date: number
  end_date: number
  indices: string[]
  enigmes: string[]
  is_draft: boolean
  state?: "Open" | "Closed"
}

type HuntingsProps = {
  user: User | null
  id: string | null
}

export default function Huntings({ user, id }: HuntingsProps) {
  const [showCreateHuntingModal, setShowCreateHuntingModal] = useState(false)
  const [stepCreateHunting, setStepCreateHunting] = useState<number>(0)
  const [editingHunt, setEditingHunt] = useState<Hunting | null>(null)

  const [huntings, setHuntings] = useState<Hunting[]>([])
  const [loading, setLoading] = useState(true)

  const onClose = () => {
    setShowCreateHuntingModal(false)
    setStepCreateHunting(0)
    setEditingHunt(null)
  }

  useEffect(() => {
    if (!id) return

    const fetchHuntings = async () => {
      try {
        setLoading(true)
        const res = await fetchBack({
          endpoint: `/huntings/user/${id}`,
          method: "GET",
        })

        if (!res.ok) {
          throw new Error(`Erreur HTTP : ${res.status}`)
        }

        const data = await res.json()
        setHuntings(data)
        console.log("Réponse brute :", data)
      } catch (err) {
        console.error("Erreur chargement des chasses :", err)
      } finally {
        setLoading(false)
      }
    }

    fetchHuntings()
  }, [id])

  const drafts = huntings.filter(h => h.is_draft)
  const published = huntings.filter(h => !h.is_draft)

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
                  onClick={() => {
                    setEditingHunt(null)
                    setShowCreateHuntingModal(true)
                  }}
              >
              <span className="stroke-1 font-lilita text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                Créer une chasse
              </span>
              </button>
            </div>
          </div>

          {loading ? (
              <p className="text-white text-center mt-4">Chargement des chasses...</p>
          ) : (
              <div className="w-full px-4 mt-4">
                <h3 className="text-white text-xl mt-6">Chasses publiées</h3>
                <ul className="text-white list-disc ml-5">
                  {published.length === 0 ? (
                      <li>Aucune chasse publiée</li>
                  ) : (
                      published.map(h => (
                          <li key={h.id} className="flex items-center gap-2">
                            {h.title}
                            {typeof h.state !== "undefined" && (
                                <span className="ml-2 text-sm text-orange-300">
                        ({h.state})
                      </span>
                            )}
                            <button
                                onClick={() => {
                                  setEditingHunt(h)
                                  setShowCreateHuntingModal(true)
                                }}
                                className="ml-2 text-sm text-blue-300 underline"
                            >
                              Modifier
                            </button>
                          </li>
                      ))
                  )}
                </ul>

                <h3 className="text-white text-xl mt-6">Brouillons</h3>
                <ul className="text-white list-disc ml-5">
                  {drafts.length === 0 ? (
                      <li>Aucun brouillon</li>
                  ) : (
                      drafts.map(h => (
                          <li key={h.id} className="flex items-center gap-2">
                            {h.title}
                            <button
                                onClick={() => {
                                  setEditingHunt(h)
                                  setShowCreateHuntingModal(true)
                                }}
                                className="ml-2 text-sm text-blue-300 underline"
                            >
                              Modifier
                            </button>
                          </li>
                      ))
                  )}
                </ul>
              </div>
          )}
        </PageContainer>

        <CreateHunting
            userId={id}
            showModal={showCreateHuntingModal}
            onClose={onClose}
            setStepCreateHunting={setStepCreateHunting}
            stepCreateHunting={stepCreateHunting}
            editingHunt={editingHunt}
        />
      </div>
  )
}
