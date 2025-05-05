import { Inject, Injectable } from "@nestjs/common"

import { ClientProxy } from "@nestjs/microservices"
import { firstValueFrom } from "rxjs"
import { FirebaseService } from "../../firebase/firebase.service"
import { AuctionConverter } from "./types/auction"
import { TypesenseService } from "../typesense/typesense.service"
import { FieldPath } from "firebase-admin/firestore"

@Injectable()
export class SalesHotelService {
  constructor(private readonly firebaseService: FirebaseService, @Inject("ARTEFACT_SERVICE") private readonly clientArtefactService: ClientProxy, private readonly typesenseService: TypesenseService) {}

  async createAuction(userId, auctionInfo) {
    const userArtefactId = auctionInfo.user_artefact_id
    const auction_price = auctionInfo.auction_price
    const timer = this.convertTimer(auctionInfo.timer)
    const createdAt = Math.floor(Date.now() / 1000)
    const artefact_name = auctionInfo.artefact_name
    const artefact_rarity = auctionInfo.artefact_rarity
    const artefact_image = auctionInfo.image
    let fix_price = null

    if (auctionInfo.direct_sale) {
      fix_price = auctionInfo.fix_price
    }

    try {
      const docRef = await this.firebaseService.auctionCollectionRef
      .withConverter(AuctionConverter)
      .add({
        id_user_artefact: userArtefactId,
        auction_price: auction_price,
        fix_price: fix_price,
        timer: timer,
        statut: 'en cours'
      })

      const indexedAuction = {
        auction_id: docRef.id,
        creator_id: userId,
        auction_price: auction_price,
        fix_price: fix_price,
        artefact_name: artefact_name,
        artefact_rarity: artefact_rarity,
        image_url: artefact_image,
        timer: timer,
        createdAt: createdAt
      };
  
      await this.typesenseService.client
        .collections("auctions")
        .documents()
        .upsert(indexedAuction);

      await firstValueFrom(this.clientArtefactService.send({ cmd: 'modify-auction-state-ua-artefacts-service' }, { userArtefactId: userArtefactId, auction: true }))
    
    return true
    } catch (error) {
      console.error(error)
    }
  }

  async addAuction(userId, auctionInfo) {
    const snapshotUser = await this.firebaseService.usersCollectionRef
    .doc(userId)
    .get()

    if (snapshotUser) {
      console.log(snapshotUser)
    }

    const snapshotAuction = await this.firebaseService.auctionCollectionRef
      .doc(auctionInfo.auction_id)
      .get()

    await snapshotAuction.update({
        auction_price: auctionInfo.auction_price,   
        id_enricher: userId
      })
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
}
