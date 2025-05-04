import { Body, Controller, NotFoundException, Param } from "@nestjs/common"

import { MessagePattern, Payload } from "@nestjs/microservices"
import { SalesHotelService } from "./sales-hotel.service"

@Controller()
export class SalesHotelController {
  constructor(private readonly salesHotelService: SalesHotelService) {}

  @MessagePattern({ cmd: "create-sale-sales-hotel-service" })
  async createSale(@Body() userIdAndSaleInfos) {
    return await this.salesHotelService.createSale(userIdAndSaleInfos.userId, userIdAndSaleInfos.saleInfo)
  }

  @MessagePattern({ cmd: "get-all-sales-hotel-service" })
  async getAllSales() {
    return await this.salesHotelService.getAllSales()
  }

  @MessagePattern({ cmd: "buy-sales-hotel-service" })
  async buySale(@Body() userIdAndSaleInfos) {
    return await this.salesHotelService.buySale(userIdAndSaleInfos.userId, userIdAndSaleInfos.saleInfo)
  }
}
