import { Controller, Get, Param, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/auth/guards/auth.guard"
import { RewardService } from "./reward.service"

@Controller("/reward")
export class RewardController {
  constructor(private readonly clientRewardService: RewardService) {}

  @Get("user-artefact/:id")
  @UseGuards(AuthGuard)
  async getUserArtefact(@Param("id") id: string) {
    return await this.clientRewardService.getUserArtefact(id)
  }

  @Get("artefacts")
  async getArtefacts() {
    return await this.clientRewardService.getArtefacts()
  }

  @Get("user-trophy/:id")
  @UseGuards(AuthGuard)
  async getUserTrophy(@Param("id") id: string) {
    return await this.clientRewardService.getUserTrophys(id)
  }

  @Get("user-success/:id")
  @UseGuards(AuthGuard)
  async getUserSuccess(@Param("id") id: string) {
    return await this.clientRewardService.getUserSuccess(id)
  }

  @Get("user-locked-success/:id")
  @UseGuards(AuthGuard)
  async getUserLockedSuccess(@Param("id") id: string) {
    return await this.clientRewardService.getUserLockedSuccess(id)
  }
}
