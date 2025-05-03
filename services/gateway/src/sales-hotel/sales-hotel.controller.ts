import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from "@nestjs/common"
import { SalesHotelService } from "./sales-hotel.service"

@Controller("/sales-hotel")
export class SalesHotelController {
  constructor(private readonly clientSalesHotelService: SalesHotelService) {}

}
