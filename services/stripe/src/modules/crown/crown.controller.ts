import { Controller } from "@nestjs/common"
import { MessagePattern } from "@nestjs/microservices"
import { CrownService } from "./crown.service"

@Controller()
export class CrownController {
  constructor(private readonly crownService: CrownService) {}

  @MessagePattern({ cmd: "get-crown-packages-stripe-service" })
  async getCrownPackages() {
    return await this.crownService.getCrownPackages()
  }
}
