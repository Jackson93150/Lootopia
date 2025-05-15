import { Injectable } from "@nestjs/common"

import { FieldPath } from "firebase-admin/firestore"
import { FirebaseService } from "../../firebase/firebase.service"

type UserSuccessWithDetails = {
  id_firebase: string
  success_id: string
  user_id: string
  success: { name: string; rarity: string } | null
}

@Injectable()
export class SuccessService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getUserSuccess(userId: string): Promise<UserSuccessWithDetails[] | null> {
    const snapshotUserSuccess = await this.firebaseService.userSuccessCollectionRef.where("user_id", "==", userId).get()

    const userSuccess = snapshotUserSuccess.docs.map(doc => ({
      id_firebase: doc.id,
      ...doc.data(),
    }))

    if (userSuccess.length === 0) return null

    const SuccessIds = userSuccess.map(us => us.success_id)

    const successSnapshots = await this.firebaseService.successCollectionRef
      .where(FieldPath.documentId(), "in", SuccessIds)
      .get()

    const successMap = new Map(successSnapshots.docs.map(doc => [doc.id, { id_firebase: doc.id, ...doc.data() }]))

    return userSuccess.map(userSuccess => ({
      ...userSuccess,
      success: successMap.get(userSuccess.success_id) || null,
    }))
  }

  async getAllSuccessLocked(userId: string): Promise<{ id_firebase: string; name: string; rarity: string }[]> {
    const snapshotUserSuccess = await this.firebaseService.userSuccessCollectionRef.where("user_id", "==", userId).get()

    const unlockedSuccessIds = snapshotUserSuccess.docs.map(doc => doc.data().success_id)

    const successSnapshots = await this.firebaseService.successCollectionRef.get()

    const lockedSuccess = successSnapshots.docs
      .filter(doc => !unlockedSuccessIds.includes(doc.id))
      .map(doc => ({
        id_firebase: doc.id,
        ...doc.data(),
      })) as { id_firebase: string; name: string; rarity: string }[]

    return lockedSuccess
  }
}
