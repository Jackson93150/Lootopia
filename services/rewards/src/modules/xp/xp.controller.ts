import { Controller } from "@nestjs/common"

import { MessagePattern } from "@nestjs/microservices"
import { XpService } from "./xp.service"

@Controller()
export class XpController {
  constructor(private readonly xpService: XpService) {}

  @MessagePattern({ cmd: "get-users-xp-xp-service" })
  async getUserTrophys() {
    return await this.xpService.getUsersXp()
  }
}
