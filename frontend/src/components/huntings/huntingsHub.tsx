"use client"

import { useEffect, useState } from "react"
import { fetchBack } from "@/utils/fetch"
import AppModal from "@/components/ui/AppModal"
import PageContainer from "@/components/container/page-container"
import { createParticipant } from "@/service/huntings"

interface Hunting {
    participant: any;
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
    state: boolean
    statut?: "IN_PROGRESS" | "FINISHED" | "LEAVED"
}

export default function HuntingsHub({ user, id }: { user: any; id: string | null }) {
    const [huntings, setHuntings] = useState<Hunting[]>([])
    const [ongoing, setOngoing] = useState<Hunting[]>([])
    const [completed, setCompleted] = useState<Hunting[]>([])
    const [cancelled, setCancelled] = useState<Hunting[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedHunting, setSelectedHunting] = useState<Hunting | null>(null)
    const [feedback, setFeedback] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return
            try {
                setLoading(true)

                // Chasses disponibles (non participées encore)
                const resAvailable = await fetchBack({ endpoint: "/huntings/all", method: "GET" })

                // Chasses où l'utilisateur est participant
                const resParticipating = await fetchBack({ endpoint: `/huntings/participant/${id}`, method: "GET" })

                if (!resAvailable.ok || !resParticipating.ok) throw new Error("Erreur lors de la récupération des données")

                const allAvailable = await resAvailable.json()
                const participated = await resParticipating.json() as Hunting[]

                const filteredOngoing = participated.filter(
                    (h) => h.participant?.statut === "En cours" && h.state === true
                )
                const filteredCompleted = participated.filter(
                    (h) => h.participant?.statut === "FINISHED"
                )
                const filteredCancelled = participated.filter(
                    (h) => h.participant?.statut === "LEAVED" || h.state === false
                )

                setHuntings(allAvailable)
                setOngoing(filteredOngoing)
                setCompleted(filteredCompleted)
                setCancelled(filteredCancelled)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    const handleParticipation = async () => {
        if (!selectedHunting || !id) return
        try {
            await createParticipant({
                id_user: id,
                id_chasse: selectedHunting.id,
                start_play: Date.now(),
            })

            setFeedback("Participation confirmée")
            setTimeout(() => {
                setSelectedHunting(null)
                setFeedback(null)
            }, 1500)
        } catch (err) {
            console.error(err)
            setFeedback("Erreur lors de la participation")
        }
    }

    const renderList = (list: Hunting[], label: string) => (
        <>
            <h3 className="text-2xl font-bold text-white mt-6 mb-3">{label}</h3>
            {list.length === 0 ? (
                <p className="text-white text-sm">Aucune.</p>
            ) : (
                <ul className="space-y-4">
                    {list.map((hunt) => (
                        <li key={hunt.id} className="flex justify-between items-center bg-white rounded-xl px-4 py-2 shadow">
                            <div>
                                <h3 className="font-bold text-lg">{hunt.title}</h3>
                                <p className="text-sm text-gray-600">{hunt.description.slice(0, 80)}...</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )

    return (
        <div className="flex flex-col w-full h-full">
            <h2 className="text-3xl font-lilita text-white mb-6">Chasses disponibles</h2>

            {loading ? (
                <p className="text-white">Chargement...</p>
            ) : huntings.length === 0 ? (
                <p className="text-white">Aucune chasse publique disponible pour le moment.</p>
            ) : (
                <ul className="space-y-4">
                    {huntings.map((hunt) => (
                        <li key={hunt.id} className="flex justify-between items-center bg-white rounded-xl px-4 py-2 shadow">
                            <div>
                                <h3 className="font-bold text-lg">{hunt.title}</h3>
                                <p className="text-sm text-gray-600">{hunt.description.slice(0, 80)}...</p>
                            </div>
                            <button
                                onClick={() => setSelectedHunting(hunt)}
                                className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
                            >
                                Participer
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <AppModal modalIsOpen={!!selectedHunting} closeModal={() => setSelectedHunting(null)}>
                {selectedHunting && (
                    <PageContainer color="grey" size="sm">
                        <h2 className="text-2xl font-bold mb-2">{selectedHunting.title}</h2>
                        <p className="mb-2">{selectedHunting.description}</p>
                        <p className="text-sm text-gray-600 mb-4">
                            Type: {selectedHunting.type}, Participation: {selectedHunting.fees}    |    Limite: {selectedHunting.participants_limit}
                        </p>

                        {feedback ? (
                            <p className="text-center font-bold text-green-600">{feedback}</p>
                        ) : (
                            <button
                                onClick={handleParticipation}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                                Confirmer la participation
                            </button>
                        )}
                    </PageContainer>
                )}
            </AppModal>

            {renderList(ongoing, "Chasses en cours")}
            {renderList(completed, "Chasses terminées")}
            {renderList(cancelled, "Chasses annulées")}
        </div>
    )
}
