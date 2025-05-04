import { Injectable, type OnModuleInit } from "@nestjs/common"
import { type App, type ServiceAccount, cert, getApps, initializeApp } from "firebase-admin/app"
import { type Auth, getAuth } from "firebase-admin/auth"
import { type Firestore, getFirestore } from "firebase-admin/firestore"
import { SaleConverter } from "src/modules/sales-hotel/types/sale"
import { InternalTransactionConverter } from "src/modules/sales-hotel/types/transaction"


@Injectable()
export class FirebaseService implements OnModuleInit {
  public app: App
  public firestore: Firestore
  public auth: Auth

  public saleCollectionRef
  public internalTransactionsCollectionRef

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

    this.saleCollectionRef = this.firestore.collection("sales").withConverter(SaleConverter)
    this.internalTransactionsCollectionRef = this.firestore.collection("internal_transactions").withConverter(InternalTransactionConverter)
  }
}
