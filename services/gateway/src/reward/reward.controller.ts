import { Controller, Get, UseGuards } from "@nestjs/common"
import { AuthDecorator } from "src/auth/decorators/auth.decorator"
import { AuthenticatedUser } from "src/auth/dto/auth.dto"
import { AuthGuard } from "src/auth/guards/auth.guard"
import { RewardService } from "./reward.service"

@Controller("/reward")
export class RewardController {
  constructor(private readonly clientRewardService: RewardService) {}

  @Get("user-artefact")
  @UseGuards(AuthGuard)
  async getUserArtefact(@AuthDecorator() user: AuthenticatedUser) {
    return await this.clientRewardService.getUserArtefact(user.id)
  }
}
