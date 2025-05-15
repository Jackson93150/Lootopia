import { Body, Controller } from "@nestjs/common"

import { MessagePattern } from "@nestjs/microservices"
import { TrophyService } from "./trophy.service"

@Controller()
export class TrophyController {
  constructor(private readonly trophyService: TrophyService) {}

  @MessagePattern({ cmd: "get-user-trophys-trophys-service" })
  async getUserTrophys(@Body() userId: string) {
    return await this.trophyService.getUserTrophys(userId)
  }
}
