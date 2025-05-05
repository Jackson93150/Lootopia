import { Body, Controller } from "@nestjs/common"

import { MessagePattern } from "@nestjs/microservices"
import { SalesHotelService } from "./sales-hotel.service"

@Controller()
export class SalesHotelController {
  constructor(private readonly salesHotelService: SalesHotelService) {}

  @MessagePattern({ cmd: "create-auction-sales-hotel-service" })
  async createAuction(@Body() userIdAndAuctionInfos) {
    return await this.salesHotelService.createAuction(userIdAndAuctionInfos.userId, userIdAndAuctionInfos.auctionInfo)
  }

  @MessagePattern({ cmd: "add-auction-sales-hotel-service" })
  async addAuction(@Body() userIdAndAuctionInfos) {
    return await this.salesHotelService.addAuction(userIdAndAuctionInfos.userId, userIdAndAuctionInfos.auctionInfo)
  }
}
