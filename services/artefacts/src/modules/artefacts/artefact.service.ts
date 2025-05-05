import { Injectable } from "@nestjs/common"

import { FieldPath } from "firebase-admin/firestore"
import { FirebaseService } from "../../firebase/firebase.service"
import { ArtefactDocument } from "./types/artefact"

@Injectable()
export class ArtefactService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getAllArtefacts() {
    const snapshotArtefacts = await this.firebaseService.artefactsCollectionRef.get()

    const artefacts: ArtefactDocument[] = snapshotArtefacts.docs.map(doc => ({
      id_firebase: doc.id,
      ...doc.data(),
    }))

    return artefacts
  }

  async getUserArtefacts(userId: string) {
    const snapshotUserArtefacts = await this.firebaseService.userArtefactsCollectionRef
      .where("id_user", "==", userId)
      .where("auction", "==", false)
      .where("is_saled", "==", false)
      .where("is_exported_nft", "==", false)
      .get()

    const userArtefacts = snapshotUserArtefacts.docs.map(doc => ({
      id_firebase: doc.id,
      ...doc.data(),
    }))

    if (userArtefacts.length === 0) return userArtefacts

    const artefactIds = userArtefacts.map(ua => ua.id_artefact)

    const artefactsSnapshots = await this.firebaseService.artefactsCollectionRef
      .where(FieldPath.documentId(), "in", artefactIds)
      .get()

    const artefactsMap = new Map(artefactsSnapshots.docs.map(doc => [doc.id, { id_firebase: doc.id, ...doc.data() }]))

    return userArtefacts.map(userArtefact => ({
      ...userArtefact,
      artefact: artefactsMap.get(userArtefact.id_artefact) || null,
    }))
  }

  async getArtefactsByUserArtefactIdsForAuction(userArtefactIds) {
    const userArtefactSnapshots = await this.firebaseService.userArtefactsCollectionRef
      .where(FieldPath.documentId(), "in", userArtefactIds)
      .get()

    const userArtefacts = userArtefactSnapshots.docs.map(doc => ({
      id_firebase: doc.id,
      ...doc.data(),
    }))

    const artefactIds = userArtefacts.map(ua => ua.id_artefact)

    const artefactsSnapshots = await this.firebaseService.artefactsCollectionRef
      .where(FieldPath.documentId(), "in", artefactIds)
      .get()

    const artefacts = artefactsSnapshots.docs.map(doc => ({
      id_firebase: doc.id,
      ...doc.data(),
    }))

    const artefactMap = Object.fromEntries(artefacts.map(a => [a.id_firebase, a]))

    const merged = userArtefacts.map(ua => ({
      ...ua,
      artefact: artefactMap[ua.id_artefact] || null,
    }))

    return merged
  }

  async modifyAuctionStateUserArtefact(artefactId, auctionState) {
    const docRef = this.firebaseService.userArtefactsCollectionRef.doc(artefactId)
    const snapshot = await docRef.get()

    if (!snapshot.exists) {
      throw new Error(`Aucun artefact trouvé avec l'ID : ${artefactId}`)
    }

    await docRef.update({ auction: auctionState })

    return true
  }

  private async getArtefactsByIds(artefactIds) {
    const artefactsSnapshots = await this.firebaseService.artefactsCollectionRef
      .where(FieldPath.documentId(), "in", artefactIds)
      .get()

    return artefactsSnapshots.docs.map(doc => ({
      id_firebase: doc.id,
      ...doc.data(),
    }))
  }
}
