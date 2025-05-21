import { Injectable } from "@nestjs/common"

import { FieldPath } from "firebase-admin/firestore"
import { FirebaseService } from "../../firebase/firebase.service"
import { ArtefactDocument } from "./types/artefact"
import { ArtefactFilterOptions } from "./types/filters"
import { UserArtefactConverter, UserArtefactDocument } from "./types/user-artefact"

@Injectable()
export class ArtefactService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getUserArtefacts(userId: string, filters: ArtefactFilterOptions = {}): Promise<UserArtefactDocument[]> {
    const normalizeBoolean = (value?: string | boolean): boolean | undefined => {
      if (value === undefined) return undefined
      if (typeof value === "boolean") return value
      return value.toLowerCase() === "true"
    }

    const normalizedFilters = {
      auction: normalizeBoolean(filters.auction),
      is_saled: normalizeBoolean(filters.is_saled),
      is_exported_nft: normalizeBoolean(filters.is_exported_nft),
    }

    let query = this.firebaseService.userArtefactsCollectionRef.where("id_user", "==", userId)

    if (normalizedFilters.auction !== undefined) {
      query = query.where("auction", "==", normalizedFilters.auction)
    }
    if (normalizedFilters.is_saled !== undefined) {
      query = query.where("is_saled", "==", normalizedFilters.is_saled)
    }
    if (normalizedFilters.is_exported_nft !== undefined) {
      query = query.where("is_exported_nft", "==", normalizedFilters.is_exported_nft)
    }

    const snapshotUserArtefacts = await query.get()

    const userArtefacts = snapshotUserArtefacts.docs.map(doc => ({
      id_firebase: doc.id,
      ...doc.data(),
    }))

    if (userArtefacts.length === 0) return []

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
