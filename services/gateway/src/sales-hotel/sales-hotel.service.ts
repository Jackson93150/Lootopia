import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

@Injectable()
export class SalesHotelService {
  constructor(@Inject("SALES_HOTEL_SERVICE") private readonly clientSalesHotelService: ClientProxy) {}

}
