import { Injectable, type OnModuleInit } from "@nestjs/common"
import { type App, type ServiceAccount, cert, getApps, initializeApp } from "firebase-admin/app"
import { type Auth, getAuth } from "firebase-admin/auth"
import { type Firestore, getFirestore } from "firebase-admin/firestore"

import { ArtefactConverter } from "../artefact/types/artefact"
import { FusionConverter } from "../artefact/types/fusion"
import { UserArtefactConverter } from "../artefact/types/user"
import { CacheConverter } from "../chasse/types/cache"
import { ChasseConverter } from "../chasse/types/chasse"
import { DraftConverter } from "../chasse/types/draft"
import { EnigmeConverter } from "../chasse/types/enigme"
import { IndiceConverter } from "../chasse/types/indice"
import { ParticipantConverter } from "../chasse/types/participant"
import { WhitelistConverter } from "../chasse/types/whitelist"
import { EnchereConverter } from "../economie/types/enchere"
import { TransactionInterneConverter } from "../economie/types/transaction"
import { EvaluationConverter } from "../evaluation/types/evaluation"
import { NotificationConverter } from "../notification/types/notification"
import { PartenaireConverter } from "../partenaire/types/partenaire"
import { RangConverter } from "../rang/types/rang"
import { RecompenseExterneConverter } from "../recompense/types/externe"
import { RecompenseInterneConverter } from "../recompense/types/interne"
import { CrownPackageConverter } from "../stripe/types/package"
import { StripeTransactionConverter } from "../stripe/types/stripe"
import { UserConverter } from "../users/types/user"

@Injectable()
export class FirebaseService implements OnModuleInit {
  public app: App
  public firestore: Firestore
  public auth: Auth

  public usersCollectionRef
  public partenairesCollectionRef
  public rangsCollectionRef
  public recompensesInternesCollectionRef
  public recompensesExternesCollectionRef
  public artefactsCollectionRef
  public fusionsCollectionRef
  public userArtefactsCollectionRef
  public encheresCollectionRef
  public transactionsInternesCollectionRef
  public stripeTransactionsCollectionRef
  public crownPackagesCollectionRef
  public chassesCollectionRef
  public draftsCollectionRef
  public cachesCollectionRef
  public whitelistsCollectionRef
  public indicesCollectionRef
  public enigmesCollectionRef
  public participantsCollectionRef
  public notificationsCollectionRef
  public evaluationsCollectionRef

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
    this.partenairesCollectionRef = this.firestore.collection("partenaires").withConverter(PartenaireConverter)
    this.rangsCollectionRef = this.firestore.collection("rangs").withConverter(RangConverter)
    this.recompensesInternesCollectionRef = this.firestore
      .collection("recompenses_internes")
      .withConverter(RecompenseInterneConverter)
    this.recompensesExternesCollectionRef = this.firestore
      .collection("recompenses_externes")
      .withConverter(RecompenseExterneConverter)
    this.artefactsCollectionRef = this.firestore.collection("artefacts").withConverter(ArtefactConverter)
    this.fusionsCollectionRef = this.firestore.collection("fusions").withConverter(FusionConverter)
    this.userArtefactsCollectionRef = this.firestore.collection("user_artefacts").withConverter(UserArtefactConverter)
    this.encheresCollectionRef = this.firestore.collection("encheres").withConverter(EnchereConverter)
    this.transactionsInternesCollectionRef = this.firestore
      .collection("transactions_internes")
      .withConverter(TransactionInterneConverter)
    this.stripeTransactionsCollectionRef = this.firestore
      .collection("stripe_transactions")
      .withConverter(StripeTransactionConverter)
    this.crownPackagesCollectionRef = this.firestore.collection("crown_packages").withConverter(CrownPackageConverter)
    this.chassesCollectionRef = this.firestore.collection("chasses").withConverter(ChasseConverter)
    this.draftsCollectionRef = this.firestore.collection("drafts").withConverter(DraftConverter)
    this.cachesCollectionRef = this.firestore.collection("caches").withConverter(CacheConverter)
    this.whitelistsCollectionRef = this.firestore.collection("whitelists").withConverter(WhitelistConverter)
    this.indicesCollectionRef = this.firestore.collection("indices").withConverter(IndiceConverter)
    this.enigmesCollectionRef = this.firestore.collection("enigmes").withConverter(EnigmeConverter)
    this.participantsCollectionRef = this.firestore.collection("participants").withConverter(ParticipantConverter)
    this.notificationsCollectionRef = this.firestore.collection("notifications").withConverter(NotificationConverter)
    this.evaluationsCollectionRef = this.firestore.collection("evaluations").withConverter(EvaluationConverter)
  }
}
