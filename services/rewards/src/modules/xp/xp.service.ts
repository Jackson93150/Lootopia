import { Injectable } from "@nestjs/common"
import { Cron } from "@nestjs/schedule"
import { plainToInstance } from "class-transformer"
import { FirebaseService } from "../../firebase/firebase.service"
import { UserTrophyDocument } from "../trophy/types/user-trophy"

type User = {
  username: string
  email: string
  biographie?: string
  logo_url?: string
  localisation?: string
  solde: number
  double_authentification: boolean
  last_login?: Date
  role: string
  xp: number
  id_rang?: string
  id_partenaire?: string
  statut: string
}

type UserWithId = User & { id_user: string }

@Injectable()
export class XpService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getUsersXp(): Promise<UserWithId[]> {
    const snapshot = await this.firebaseService.userCollectionRef.get()

    const results: UserWithId[] = []

    for (const doc of snapshot.docs) {
      try {
        const data = doc.data()

        if (typeof data.xp !== "number" || !data.username) {
          console.warn(`Utilisateur invalide dans doc ${doc.id}`, data)
          continue
        }

        results.push({
          ...data,
          id_user: doc.id,
        })
      } catch (e) {
        console.warn(`Erreur lors du traitement de l'utilisateur ${doc.id}`, e)
      }
    }

    results.sort((a, b) => b.xp - a.xp)

    return results
  }

  @Cron("0 0 1 * *")
  async resetXpForAllUsers() {
    const trophiesSnapshot = await this.firebaseService.trophyCollectionRef.get()
    const trophyByName: Record<string, string> = {}

    trophiesSnapshot.forEach(doc => {
      const data = doc.data()
      trophyByName[data.name.toLowerCase()] = doc.id
    })

    const users = await this.getUsersXp()
    const totalUsers = users.length
    const now = Date.now().toString()
    const batch = this.firebaseService.firestore.batch()

    users.forEach((user, index) => {
      let trophyName: string | null = null
      const rank = (index + 1) / totalUsers

      if (index === 0) trophyName = "champion"
      else if (rank <= 0.1) trophyName = "diamond"
      else if (rank <= 0.25) trophyName = "platinum"
      else if (rank <= 0.5) trophyName = "gold"
      else if (rank <= 0.9) trophyName = "bronze"

      const trophyId = trophyByName[trophyName ?? ""]

      if (trophyName && trophyId) {
        const userTrophyRef = this.firebaseService.userTrophyCollectionRef.doc()

        const userTrophy = plainToInstance(UserTrophyDocument, {
          user_id: user.id_user,
          trophy_id: trophyId,
          date: now,
        })

        batch.set(userTrophyRef, userTrophy)
      }
    })

    const userSnapshot = await this.firebaseService.userCollectionRef.get()

    userSnapshot.forEach(doc => {
      batch.update(doc.ref, { xp: 0 })
    })

    await batch.commit()
  }
}
