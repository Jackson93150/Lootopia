import { Injectable } from "@nestjs/common"
import { FirebaseService } from "../../firebase/firebase.service"

@Injectable()
export class HuntingsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async createDraft(hunting) {
    const userArtefactId = auctionInfo.user_artefact_id
    const artefactId = auctionInfo.artefact_id
    const auction_price = auctionInfo.auction_price
    const timer = this.convertTimer(auctionInfo.timer)
    const fix_price = auctionInfo.fix_price

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
}
