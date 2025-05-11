import { Body, Controller } from "@nestjs/common"

import { MessagePattern } from "@nestjs/microservices"
import { SalesHotelService } from "./sales-hotel.service"

@Controller()
export class SalesHotelController {
  constructor(private readonly salesHotelService: SalesHotelService) {}

  @MessagePattern({ cmd: "create-auction-sales-hotel-service" })
  async createAuction(@Body() body) {
    return await this.salesHotelService.createAuction(body.auctionInfo)
  }

  @MessagePattern({ cmd: "cancel-auction-sales-hotel-service" })
  async cancelAuction(@Body() body) {
    return await this.salesHotelService.cancelAuction(body.auctionInfo)
  }

  @MessagePattern({ cmd: "directly-buy-auction-sales-hotel-service" })
  async directlyBuy(@Body() body) {
    return await this.salesHotelService.directlyBuy(body.userId, body.buyInfo)
  }

  @MessagePattern({ cmd: "add-bid-auction-sales-hotel-service" })
  async addBid(@Body() body) {
    return await this.salesHotelService.addBid(body.userId, body.bidInfo)
  }

  @MessagePattern({ cmd: "remove-bid-auction-sales-hotel-service" })
  async removeBid(@Body() body) {
    return await this.salesHotelService.removeBid(body.userId, body.bidInfo)
  }
}
