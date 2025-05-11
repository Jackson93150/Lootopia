import { Body, Controller } from "@nestjs/common"

import { MessagePattern } from "@nestjs/microservices"
import { SuccessService } from "./success.service"

@Controller()
export class SuccessController {
  constructor(private readonly successService: SuccessService) {}

  @MessagePattern({ cmd: "get-user-success-success-service" })
  async getUserSuccess(@Body() user: { userId: string }) {
    return await this.successService.getUserSuccess(user.userId)
  }

  @MessagePattern({ cmd: "get-locked-success-success-service" })
  async getUserLockedSuccess(@Body() user: { userId: string }) {
    return await this.successService.getAllSuccessLocked(user.userId)
  }
}
