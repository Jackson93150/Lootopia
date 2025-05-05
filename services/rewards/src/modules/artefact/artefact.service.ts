import { Injectable } from "@nestjs/common"

import { FieldPath } from "firebase-admin/firestore"
import { FirebaseService } from "../../firebase/firebase.service"
import { UserArtefactDocument } from "./types/user-artefact"

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
}
