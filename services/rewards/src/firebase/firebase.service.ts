import { Injectable, type OnModuleInit } from "@nestjs/common"
import { type App, type ServiceAccount, cert, getApps, initializeApp } from "firebase-admin/app"
import { type Auth, getAuth } from "firebase-admin/auth"
import { type CollectionReference, type Firestore, getFirestore } from "firebase-admin/firestore"
import { ArtefactConverter, ArtefactDocument } from "../modules/artefact/types/artefact"
import { FusionConverter, FusionDocument } from "../modules/artefact/types/fusion"
import { UserArtefactConverter, UserArtefactDocument } from "../modules/artefact/types/user-artefact"

@Injectable()
export class FirebaseService implements OnModuleInit {
  public app: App
  public firestore: Firestore
  public auth: Auth

  public artefactsCollectionRef: CollectionReference<ArtefactDocument>
  public fusionsCollectionRef: CollectionReference<FusionDocument>
  public userArtefactsCollectionRef: CollectionReference<UserArtefactDocument>

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
    this.fusionsCollectionRef = this.firestore.collection("fusions").withConverter(FusionConverter)
    this.userArtefactsCollectionRef = this.firestore.collection("user_artefact").withConverter(UserArtefactConverter)
  }
}
