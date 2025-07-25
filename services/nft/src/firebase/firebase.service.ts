import { Injectable, type OnModuleInit } from "@nestjs/common"
import { type App, type ServiceAccount, cert, getApps, initializeApp } from "firebase-admin/app"
import { type Auth, getAuth } from "firebase-admin/auth"
import { CollectionReference, type Firestore, getFirestore } from "firebase-admin/firestore"

import { type Storage, getStorage } from "firebase-admin/storage"
import { UserArtefactConverter, UserArtefactDocument } from "../modules/nft/types/artefact/user-artefact"

@Injectable()
export class FirebaseService implements OnModuleInit {
  public app: App
  public firestore: Firestore
  public auth: Auth
  public storage: Storage

  public userArtefactsCollectionRef: CollectionReference<UserArtefactDocument>

  onModuleInit() {
    const serviceAccount: string | ServiceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)
    const credential = cert(serviceAccount)

    this.app =
      getApps()[0] ??
      initializeApp({
        credential,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      })

    this.firestore = getFirestore(this.app)
    this.auth = getAuth(this.app)
    this.storage = getStorage(this.app)

    this.userArtefactsCollectionRef = this.firestore.collection("user_artefact").withConverter(UserArtefactConverter)
  }
}
