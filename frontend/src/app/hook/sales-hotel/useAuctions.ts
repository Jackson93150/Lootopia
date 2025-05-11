import type { ArtefactData } from "@/app/types/artefact"
import type { AuctionType } from "@/app/types/auction"
import { db } from "@/lib/firebase"
import { getArtefacts } from "@/service/rewards"
import { collection, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"

function useAuctionsRealtime() {
  const [auctions, setAuctions] = useState<AuctionType[]>([])

  useEffect(() => {
    const q = query(collection(db, "auctions"))

    const unsubscribe = onSnapshot(q, snapshot => {
      const data = snapshot.docs.map(doc => {
        const { id, ...rest } = doc.data() as AuctionType
        return {
          id: doc.id,
          ...rest,
        }
      })
      .filter(doc => doc.statut === "en cours")

      setAuctions(data)
    })

    return () => unsubscribe()
  }, [])

  return auctions
}

export function useMergedAuctionsWithArtefact() {
  const auctions = useAuctionsRealtime()
  const [merged, setMerged] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAndMerge = async () => {
      try {
        const artefacts = await getArtefacts()

        const enriched = auctions.map(auction => {
          const artefact = artefacts.find((a: ArtefactData) => a.id === auction.id_artefact)
          return {
            ...auction,
            artefact,
          }
        })

        setMerged(enriched)
      } catch (err) {
        console.error("Erreur lors de la fusion auctions/artefacts :", err)
      } finally {
        setLoading(false)
      }
    }

    if (auctions.length > 0) {
      fetchAndMerge()
    }
  }, [auctions])

  return { auctions: merged, loading }
}
