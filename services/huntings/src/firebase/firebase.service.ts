import { Injectable, type OnModuleInit } from "@nestjs/common"
import { type App, type ServiceAccount, cert, getApps, initializeApp } from "firebase-admin/app"
import { type Auth, getAuth } from "firebase-admin/auth"
import { type Firestore, getFirestore } from "firebase-admin/firestore"

import { type Storage, getStorage } from "firebase-admin/storage"
import { HuntingConverter } from "src/modules/huntings/types/huntings"
import { ParticipantConverter } from "src/modules/huntings/types/participants"

@Injectable()
export class FirebaseService implements OnModuleInit {
  public app: App
  public firestore: Firestore
  public auth: Auth
  public storage: Storage

  public huntingsCollectionRef
  public participantsCollectionRef

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

    this.huntingsCollectionRef = this.firestore.collection("huntings").withConverter(HuntingConverter)
    this.participantsCollectionRef = this.firestore.collection("participants").withConverter(ParticipantConverter)
  }
}
