import { Body, Controller } from "@nestjs/common"

import { MessagePattern } from "@nestjs/microservices"
import { HuntingsService } from "./huntings.service"

@Controller()
export class HuntingsController {
  constructor(private readonly huntingsService: HuntingsService) {}

  @MessagePattern({ cmd: "create-draft-hunting-service" })
  async createAuction(@Body() body) {
    return await this.huntingsService.createAuction(body.auctionInfo)
  }
}
