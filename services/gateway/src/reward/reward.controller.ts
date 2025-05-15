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

  @Get("artefacts")
  async getArtefacts() {
    return await this.clientRewardService.getArtefacts()
  }

  @Get("user-trophy")
  @UseGuards(AuthGuard)
  async getUserTrophy(@AuthDecorator() user: AuthenticatedUser) {
    return await this.clientRewardService.getUserTrophys(user.id)
  }

  @Get("user-success")
  @UseGuards(AuthGuard)
  async getUserSuccess(@AuthDecorator() user: AuthenticatedUser) {
    return await this.clientRewardService.getUserSuccess(user.id)
  }

  @Get("user-locked-success")
  @UseGuards(AuthGuard)
  async getUserLockedSuccess(@AuthDecorator() user: AuthenticatedUser) {
    return await this.clientRewardService.getUserLockedSuccess(user.id)
  }
}
