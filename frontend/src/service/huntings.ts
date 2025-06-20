import { fetchBack } from "@/utils/fetch"

export async function createHunt({
                                     userId,
                                     title,
                                     description,
                                     type,
                                     isPublic,
                                     feed,
                                     limitParticipant,
                                     latitude,
                                     longitude,
                                     startedAt,
                                     endedAt,
                                     indices,
                                     enigmes,
                                     state,
                                     is_draft = false
                                 }: {
    userId: string
    title: string
    description: string
    type: "RA" | "carte"
    isPublic: boolean
    feed: number | null
    limitParticipant: number | null
    latitude: number
    longitude: number
    startedAt: number
    endedAt: number
    indices: string[]
    enigmes: string[]
    state?: boolean
    is_draft?: boolean,
}) {
    const res = await fetchBack({
        endpoint: "/huntings/create",
        method: "POST",
        body: {
            id_creator: userId,
            title,
            description,
            type,
            is_public: isPublic,
            fees: feed ?? 0,
            participants_limit: limitParticipant ?? 0,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
            start_date: startedAt,
            end_date: endedAt,
            indices,
            enigmes,
            is_draft,
            state: state ?? true,
        },
    })

    if (!res.ok) {
        throw new Error(`Erreur HTTP : ${res.status}`)
    }

    return res.json()
}

export async function updateHunt(huntId: string, {
    userId,
    title,
    description,
    type,
    isPublic,
    feed,
    limitParticipant,
    latitude,
    longitude,
    startedAt,
    endedAt,
    indices,
    enigmes,
    state,
    is_draft = false
}: {
    userId: string
    title: string
    description: string
    type: "RA" | "carte"
    isPublic: boolean
    feed: number | null
    limitParticipant: number | null
    latitude: number
    longitude: number
    startedAt: number
    endedAt: number
    indices: string[]
    enigmes: string[]
    state?: boolean
    is_draft?: boolean
}) {
    const res = await fetchBack({
        endpoint: `/huntings/update/${huntId}`,
        method: "PATCH",
        body: {
            id_creator: userId,
            title,
            description,
            type,
            is_public: isPublic,
            fees: feed ?? 0,
            participants_limit: limitParticipant ?? 0,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
            start_date: startedAt,
            end_date: endedAt,
            indices,
            enigmes,
            is_draft,
            state: state ?? true,
        },
    })

    if (!res.ok) {
        throw new Error(`Erreur HTTP : ${res.status}`)
    }

    return res.json()
}

export async function createParticipant({
                                            id_user,
                                            id_chasse,
                                            start_play,
                                        }: {
    id_user: string
    id_chasse: string
    start_play: number
}) {
    const res = await fetchBack({
        endpoint: "/huntings/participant/create",
        method: "POST",
        body: {
            id_user,
            id_chasse,
            start_play,
            statut: "En cours",
            is_winner: false,
        },
    })

    if (!res.ok) {
        throw new Error(`Erreur HTTP : ${res.status}`)
    }

    return res.json()
}


