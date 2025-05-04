import { ConflictException, Injectable, NotFoundException, Response } from "@nestjs/common"

import { FirebaseService } from "../../firebase/firebase.service"
import { ArtefactDocument } from "./types/artefact"
import { FieldPath } from "firebase-admin/firestore"

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

  async getUserArtefact(userId: string) {
    const snapshotUserArtefacts = await this.firebaseService.userArtefactsCollectionRef
    .where("id_user", "==", userId)
    .get()


    const artefactIds = snapshotUserArtefacts.docs.map(doc => doc.data().id_artefact)

    if (artefactIds.length === 0) return artefactIds;

    const artefactsSnapshots = await this.firebaseService.artefactsCollectionRef
    .where(FieldPath.documentId(), "in", artefactIds)
    .get()

    return artefactsSnapshots.docs.map(doc => ({
      id_firebase: doc.id,
      ...doc.data(),
    }))
  }

  async removeOwnerArtefact(userId: string, artefactId: string) {
    try {
      const snapshot = await this.firebaseService.userArtefactsCollectionRef
      .where("id_user", "==", userId)
      .where("id_artefact", "==", artefactId)
      .get();
  
      const deletePromises = snapshot.docs.map(doc => doc.ref.delete());
  
      await Promise.all(deletePromises);
      
      return true
    } catch (error) {
      console.error(error)
    }
  }

  async getArtefactsByIds(artefactIds) {
    const artefactsSnapshots = await this.firebaseService.artefactsCollectionRef
      .where(FieldPath.documentId(), "in", artefactIds)
      .get()

    return artefactsSnapshots.docs.map(doc => ({
      id_firebase: doc.id,
      ...doc.data(),
    }))
  }
}
