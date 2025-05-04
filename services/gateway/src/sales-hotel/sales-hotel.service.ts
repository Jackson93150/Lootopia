import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

@Injectable()
export class SalesHotelService {
  constructor(@Inject("SALES_HOTEL_SERVICE") private readonly clientSalesHotelService: ClientProxy) {}

  async createSale(userId: string, saleInfo: { artefact_id: string, crown_price: number }) {
    return await this.clientSalesHotelService.send({ cmd: 'create-sale-sales-hotel-service' }, { userId: userId, saleInfo: saleInfo })
  }

  async getAllSales() {
    return await this.clientSalesHotelService.send({ cmd: 'get-all-sales-hotel-service' }, {})
  }
}
