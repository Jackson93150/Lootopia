import { Injectable } from "@nestjs/common"
import { FirebaseService } from "../../firebase/firebase.service"
import { HuntingConverter } from "./types/huntings"

@Injectable()
export class HuntService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async createHunt(huntInfo: any) {
    try {
      await this.firebaseService.huntingsCollectionRef.add({
        ...huntInfo,
        created_at: Date.now(),
      })

      return true
    } catch (error) {
      console.error("Erreur création hunt :", error)
      throw new Error("Erreur lors de la création de la chasse")
    }
  }

  async findByUser(userId: string) {
    const snapshot = await this.firebaseService.huntingsCollectionRef
        .withConverter(HuntingConverter)
        .where("id_creator", "==", userId)
        .get()

    const hunts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    console.log("📥 Hunts Firebase :", hunts)
    return hunts
  }

  async findAll() {
    const snapshot = await this.firebaseService.huntingsCollectionRef
        .withConverter(HuntingConverter)
        .get()

    const hunts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    const filtered = hunts.filter(h => h.is_draft === false && h.state === true)

    console.log(" All hunts disponibles :", filtered)
    return filtered
  }


  async updateHunt(huntId: string, data: any) {
    try {
      await this.firebaseService.huntingsCollectionRef
          .doc(huntId)
          .set(
              {
                ...data,
                updated_at: Date.now(),
              },
              { merge: true }
          )

      return true
    } catch (error) {
      console.error("Erreur mise à jour hunt :", error)
      throw new Error("Erreur lors de la mise à jour de la chasse")
    }
  }

  async createParticipant(participantInfo: any) {
    try {
      await this.firebaseService.participantsCollectionRef.add({
        ...participantInfo,
        created_at: Date.now(),
      })
      return true
    } catch (error) {
      console.error("Erreur création participant :", error)
      throw new Error("Erreur lors de l'inscription du participant")
    }
  }

  async findHuntingsByParticipant(userId: string) {
    const snapshot = await this.firebaseService.participantsCollectionRef
        .where("id_user", "==", userId)
        .get()

    const participantDocs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    const chasseSnapshots = await Promise.all(
        participantDocs.map(async (p) => {
          const doc = await this.firebaseService.huntingsCollectionRef.doc(p.id_chasse).get()
          if (!doc.exists) return null

          return {
            id: doc.id,
            ...doc.data(),
            participant: {
              id: p.id,
              statut: p.statut,
              start_play: p.start_play,
              is_winner: p.is_winner,
            }
          }
        })
    )

    return chasseSnapshots.filter(h => h !== null)
  }
}
