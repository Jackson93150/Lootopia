import { Body, Controller } from "@nestjs/common"

import { MessagePattern } from "@nestjs/microservices"
import { SuccessService } from "./success.service"

@Controller()
export class SuccessController {
  constructor(private readonly successService: SuccessService) {}

  @MessagePattern({ cmd: "get-user-success-success-service" })
  async getUserSuccess(@Body() data: { userId: string }) {
    return await this.successService.getUserSuccess(data.userId)
  }

  @MessagePattern({ cmd: "get-locked-success-success-service" })
  async getUserLockedSuccess(@Body() data: { userId: string }) {
    return await this.successService.getAllSuccessLocked(data.userId)
  }
}
