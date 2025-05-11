import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

@Injectable()
export class SalesHotelService {
  constructor(@Inject("SALES_HOTEL_SERVICE") private readonly clientSalesHotelService: ClientProxy) {}

  async createAuction(auctionInfo: {
    user_artefact_id: string
    artefact_id: string
    fix_price: number | null
    auction_price: number
    direct_sale: boolean
    timer: string
    artefact_name: string
    artefact_rarity: string
    image: string
  }) {
    return await this.clientSalesHotelService.send(
      { cmd: "create-auction-sales-hotel-service" },
      { auctionInfo: auctionInfo },
    )
  }

  async cancelAuction(auctionInfo: {
    creator_email: string
    auction_id: string
    user_artefact_id: string
  }) {
    return await this.clientSalesHotelService.send(
      { cmd: "cancel-auction-sales-hotel-service" },
      { auctionInfo: auctionInfo },
    )
  }

  async directlyBuy(
    userId,
    buyInfo: {
      fix_price: number
      auction_id: string
      id_user_artefact: string
      id_artefact: string
      creator_email: string
    },
  ) {
    return await this.clientSalesHotelService.send(
      { cmd: "directly-buy-auction-sales-hotel-service" },
      { userId, buyInfo },
    )
  }

  async addBid(userId, bidInfo: { bid_price: number; auction_id: string; user_email: string }) {
    return await this.clientSalesHotelService.send({ cmd: "add-bid-auction-sales-hotel-service" }, { userId, bidInfo })
  }

  async removeBid(userId, bidInfo: { bid_price: number; auction_id: string; user_email: string }) {
    return await this.clientSalesHotelService.send(
      { cmd: "remove-bid-auction-sales-hotel-service" },
      { userId, bidInfo },
    )
  }
}
