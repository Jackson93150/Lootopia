import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { Cron } from "@nestjs/schedule"
import { FieldValue } from "firebase-admin/firestore"
import { firstValueFrom } from "rxjs"
import { FirebaseService } from "../../firebase/firebase.service"
import { AuctionConverter } from "./types/auction"

@Injectable()
export class SalesHotelService {
  constructor(
    private readonly firebaseService: FirebaseService,
    @Inject("REWARDS_SERVICE") private readonly clientArtefactService: ClientProxy,
    @Inject("USER_SERVICE") private readonly clientUserService: ClientProxy,
  ) {}

  async createAuction(auctionInfo) {
    const userArtefactId = auctionInfo.user_artefact_id
    const artefactId = auctionInfo.artefact_id
    const auction_price = auctionInfo.auction_price
    const timer = this.convertTimer(auctionInfo.timer)
    let fix_price = null

    if (auctionInfo.direct_sale) {
      fix_price = auctionInfo.fix_price
    }

    try {
      await this.firebaseService.auctionCollectionRef.withConverter(AuctionConverter).add({
        id_user_artefact: userArtefactId,
        id_artefact: artefactId,
        creator_email: auctionInfo.creator_email,
        auction_price: auction_price,
        fix_price: fix_price,
        timer: timer,
        created_at: Date.now(),
        statut: "en cours",
      })

      await firstValueFrom(
        this.clientArtefactService.send(
          { cmd: "modify-auction-state-ua-artefacts-service" },
          { userArtefactId: userArtefactId, auction: true },
        ),
      )

      return true
    } catch (error) {
      console.error(error)
    }
  }

  async cancelAuction(auctionInfo) {
    const docRef = this.firebaseService.auctionCollectionRef.doc(auctionInfo.auction_id)

    await docRef.update({
      statut: "annulée",
    })

    await firstValueFrom(
      this.clientArtefactService.send(
        { cmd: "modify-auction-state-ua-artefacts-service" },
        { userArtefactId: auctionInfo.user_artefact_id, auction: false },
      ),
    )

    return true
  }

  async directlyBuy(userId, buyInfo) {
    try {
      const docRef = this.firebaseService.auctionCollectionRef.doc(buyInfo.auction_id)

      const snapshot = await docRef.get()

      if (!snapshot.exists) {
        throw new Error("Auction not found")
      }

      const auction = snapshot.data()

      if (auction.statut !== "en cours") {
        throw new Error("L'enchère n'est plus disponible")
      }

      await docRef.update({
        statut: "validée",
      })

      await firstValueFrom(
        this.clientArtefactService.send(
          { cmd: "modify-saled-state-ua-artefacts-service" },
          { userArtefactId: buyInfo.id_user_artefact, saled: true },
        ),
      )
      await firstValueFrom(
        this.clientArtefactService.send(
          { cmd: "create-ua-artefacts-service" },
          { userId: userId, artefactId: buyInfo.id_artefact },
        ),
      )
      await firstValueFrom(
        this.clientUserService.send(
          { cmd: "transaction-crown-user-service" },
          { senderUserId: userId, receivedUserEmail: buyInfo.creator_email, amountCrown: buyInfo.fix_price },
        ),
      )

      return true
    } catch (error) {
      console.error(error)
    }
  }

  async addBid(userId: string, bidInfo: { bid_price: number; auction_id: string; user_email: string }) {
    const docRef = this.firebaseService.auctionCollectionRef.doc(bidInfo.auction_id)

    const snapshot = await docRef.get()

    if (!snapshot.exists) {
      throw new Error("Auction not found")
    }

    const auction = snapshot.data()

    if (auction.statut !== "en cours") {
      throw new Error("L'enchère n'est plus disponible")
    }

    await docRef.update({
      bids: FieldValue.arrayUnion({
        user_id: userId,
        user_email: bidInfo.user_email,
        amount: bidInfo.bid_price,
      }),
    })

    return true
  }

  async removeBid(userId: string, bidInfo: { bid_price: number; auction_id: string; user_email: string }) {
    const docRef = this.firebaseService.auctionCollectionRef.doc(bidInfo.auction_id)

    await docRef.update({
      bids: FieldValue.arrayRemove({
        user_id: userId,
        user_email: bidInfo.user_email,
        amount: bidInfo.bid_price,
      }),
    })

    return true
  }

  private convertTimer(timer: string): number {
    switch (timer) {
      case "1h":
        return 60 * 60 // 3600 secondes
      case "1d":
        return 24 * 60 * 60 // 86400 secondes
      case "1w":
        return 7 * 24 * 60 * 60 // 604800 secondes
      default:
        throw new Error(`Timer invalide : ${timer}`)
    }
  }

  @Cron("*/1 * * * *") // chaque minute
  async handleExpiredAuctions() {
    const now = Date.now()

    const snapshot = await this.firebaseService.auctionCollectionRef.where("statut", "==", "en cours").get()

    const expired = snapshot.docs.filter(doc => {
      const data = doc.data()
      const end = data.created_at + data.timer * 1000
      return end < now
    })

    for (const doc of expired) {
      const auction = doc.data()
      const bids = auction.bids || []

      if (bids.length > 0) {
        const lastBid = bids[bids.length - 1]

        const userId = lastBid.user_id
        const amount = lastBid.amount
        const creator_email = auction.creator_email
        const artefactId = auction.id_artefact
        const userArtefactId = auction.id_user_artefact

        await doc.ref.update({ statut: "validée" })

        await firstValueFrom(
          this.clientArtefactService.send(
            { cmd: "modify-saled-state-ua-artefacts-service" },
            { userArtefactId, saled: true },
          ),
        )
        await firstValueFrom(
          this.clientArtefactService.send({ cmd: "create-ua-artefacts-service" }, { userId, artefactId }),
        )
        await firstValueFrom(
          this.clientUserService.send(
            { cmd: "transaction-crown-user-service" },
            { senderUserId: userId, receivedUserEmail: creator_email, amountCrown: amount },
          ),
        )
      } else {
        await doc.ref.update({ statut: "annulée" })
      }
    }
  }
}
