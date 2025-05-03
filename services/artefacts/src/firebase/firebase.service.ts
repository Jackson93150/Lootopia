import { Injectable, type OnModuleInit } from "@nestjs/common"
import { type App, type ServiceAccount, cert, getApps, initializeApp } from "firebase-admin/app"
import { type Auth, getAuth } from "firebase-admin/auth"
import { type Firestore, getFirestore } from "firebase-admin/firestore"

import { ArtefactConverter } from "src/modules/artefacts/types/artefact"
import { UserArtefactConverter } from "src/modules/artefacts/types/user-artefact"

@Injectable()
export class FirebaseService implements OnModuleInit {
  public app: App
  public firestore: Firestore
  public auth: Auth

  public artefactsCollectionRef
  public userArtefactsCollectionRef

  onModuleInit() {
    const serviceAccount: string | ServiceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)
    const credential = cert(serviceAccount)

    this.app =
      getApps()[0] ??
      initializeApp({
        credential,
      })

    this.firestore = getFirestore(this.app)
    this.auth = getAuth(this.app)

    this.artefactsCollectionRef = this.firestore.collection("artefacts").withConverter(ArtefactConverter)
    this.userArtefactsCollectionRef = this.firestore.collection("user_artefact").withConverter(UserArtefactConverter)
  }
}
