import { Controller, Get, UseGuards } from "@nestjs/common"
import { RewardService } from "./reward.service"
import { AuthGuard } from "src/auth/guards/auth.guard"
import { AuthDecorator } from "src/auth/decorators/auth.decorator"
import { AuthenticatedUser } from "src/auth/dto/auth.dto"

@Controller("/reward")
export class RewardController {
  constructor(private readonly clientRewardService: RewardService) {}

  @Get("user-artefact")
  @UseGuards(AuthGuard)
  async getUserArtefact(@AuthDecorator() user: AuthenticatedUser) {
      return await this.clientRewardService.getUserArtefact(user.id)
  }
}
