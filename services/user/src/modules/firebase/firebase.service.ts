import { Injectable, type OnModuleInit } from "@nestjs/common"
import { type App, type ServiceAccount, cert, getApps, initializeApp } from "firebase-admin/app"
import { type Auth, getAuth } from "firebase-admin/auth"
import { type Firestore, getFirestore } from "firebase-admin/firestore"
import { UserConverter } from "../users/types/user.type"

@Injectable()
export class FirebaseService implements OnModuleInit {
  public app: App
  public firestore: Firestore
  public auth: Auth

  public usersCollectionRef

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

    this.usersCollectionRef = this.firestore.collection("users").withConverter(UserConverter)
  }

  public async verifyIdToken(idToken: string) {
    return await this.auth.verifyIdToken(idToken, true)
  }

  public async getUser(id: string) {
    return await this.auth.getUser(id)
  }
}
