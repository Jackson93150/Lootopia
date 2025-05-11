import { Injectable } from "@nestjs/common"

import { FieldPath } from "firebase-admin/firestore"
import { FirebaseService } from "../../firebase/firebase.service"

type UserTrophyWithDetails = {
  id_firebase: string
  trophy_id: string
  user_id: string
  date: string
  trophy: { name: string; picture_url: string } | null
}

@Injectable()
export class TrophyService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getUserTrophys(userId: string): Promise<UserTrophyWithDetails[] | null> {
    const snapshotUserTrophys = await this.firebaseService.userTrophyCollectionRef
      .where("user_id", "==", userId)
      .get()

    console.log(snapshotUserTrophys)

    const userTrophys = snapshotUserTrophys.docs.map(doc => ({
      id_firebase: doc.id,
      ...doc.data(),
    }))

    if (userTrophys.length === 0) return null

    const trophysIds = userTrophys.map(ut => ut.trophy_id)

    const trophysSnapshots = await this.firebaseService.trophyCollectionRef
      .where(FieldPath.documentId(), "in", trophysIds)
      .get()

    const trophysMap = new Map(trophysSnapshots.docs.map(doc => [doc.id, { id_firebase: doc.id, ...doc.data() }]))

    return userTrophys.map(userTrophy => ({
      ...userTrophy,
      trophy: trophysMap.get(userTrophy.trophy_id) || null,
    }))
  }
}
