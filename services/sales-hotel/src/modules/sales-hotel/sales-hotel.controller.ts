import { Body, Controller, NotFoundException, Param } from "@nestjs/common"

import { MessagePattern, Payload } from "@nestjs/microservices"
import { SalesHotelService } from "./sales-hotel.service"

@Controller()
export class SalesHotelController {
  constructor(private readonly salesHotelService: SalesHotelService) {}

}
