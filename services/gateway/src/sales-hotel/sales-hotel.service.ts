import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

@Injectable()
export class SalesHotelService {
  constructor(@Inject("SALES_HOTEL_SERVICE") private readonly clientSalesHotelService: ClientProxy) {}

  async createAuction(
    userId: string,
    auctionInfo: {
      user_artefact_id: string
      fix_price: number | null
      auction_price: number
      direct_sale: boolean
      timer: string,
      artefact_name: string
      artefact_rarity: string
      image: string
    },
  ) {
    return await this.clientSalesHotelService.send(
      { cmd: "create-auction-sales-hotel-service" },
      { userId: userId, auctionInfo: auctionInfo },
    )
  }

  async addAuction(userId: string, auctionInfo: {  user_artefact_id: string, auction_price: number, auction_id: string }) {
    return await this.clientSalesHotelService.send(
      { cmd: "add-auction-sales-hotel-service" },
      { userId: userId, auctionInfo: auctionInfo },
    )
  }
}
