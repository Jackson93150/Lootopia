import { Injectable } from "@nestjs/common"

import { FieldPath } from "firebase-admin/firestore"
import { FirebaseService } from "../../firebase/firebase.service"
import { ArtefactDocument } from "./types/artefact"
import { UserArtefactConverter, UserArtefactDocument } from "./types/user-artefact"

@Injectable()
export class ArtefactService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getUserArtefacts(userId: string): Promise<UserArtefactDocument[]> {
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

  async removeOwnerArtefact(userId: string, artefactId: string) {
    try {
      const snapshot = await this.firebaseService.userArtefactsCollectionRef
        .where("id_user", "==", userId)
        .where("id_artefact", "==", artefactId)
        .get()

      const deletePromises = snapshot.docs.map(doc => doc.ref.delete())

      await Promise.all(deletePromises)

      return true
    } catch (error) {
      console.error(error)
    }
  }

  async createUserArtefactAfterSale(userId: string, artefactId: string) {
    const newUserArtefact = new UserArtefactDocument()
    newUserArtefact.id_user = userId
    newUserArtefact.id_artefact = artefactId
    newUserArtefact.auction = false
    newUserArtefact.is_saled = false
    newUserArtefact.is_exported_nft = false

    const collectionRef = this.firebaseService.userArtefactsCollectionRef.withConverter(UserArtefactConverter)

    await collectionRef.add(newUserArtefact)

    return true
  }

  async getArtefacts(): Promise<ArtefactDocument[]> {
    try {
      const snapshot = await this.firebaseService.artefactsCollectionRef.get()

      const artefacts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))

      return artefacts
    } catch (error) {
      console.error("Erreur lors de la récupération des artefacts :", error)
      throw error
    }
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

  async modifySaledStateUserArtefact(artefactId, saledState) {
    const docRef = this.firebaseService.userArtefactsCollectionRef.doc(artefactId)
    const snapshot = await docRef.get()

    if (!snapshot.exists) {
      throw new Error(`Aucun artefact trouvé avec l'ID : ${artefactId}`)
    }

    await docRef.update({ is_saled: saledState })

    return true
  }
}
