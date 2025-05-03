import { Injectable, type OnModuleInit } from "@nestjs/common"
import { type App, type ServiceAccount, cert, getApps, initializeApp } from "firebase-admin/app"
import { type Auth, getAuth } from "firebase-admin/auth"
import { type Firestore, getFirestore } from "firebase-admin/firestore"
import { CrownPackageConverter } from "src/modules/crown/types/package"
import { StripeTransactionConverter } from "src/modules/stripe/types/stripe-transaction"

@Injectable()
export class FirebaseService implements OnModuleInit {
  public app: App
  public firestore: Firestore
  public auth: Auth

  public stripeTransactionsCollectionRef
  public crownPackagesCollectionRef

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

    this.stripeTransactionsCollectionRef = this.firestore
      .collection("stripe_transactions")
      .withConverter(StripeTransactionConverter)
    this.crownPackagesCollectionRef = this.firestore.collection("crown_packages").withConverter(CrownPackageConverter)
  }
}
