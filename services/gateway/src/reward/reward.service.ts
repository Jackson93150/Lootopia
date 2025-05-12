import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

@Injectable()
export class RewardService {
  constructor(@Inject("REWARDS_SERVICE") private readonly clientRewardService: ClientProxy) {}

  async getUserArtefact(userId: string) {
    return await this.clientRewardService.send({ cmd: "get-user-artefacts-artefacts-service" }, { userId: userId })
  }

  async getUserTrophys(userId: string) {
    return await this.clientRewardService.send({ cmd: "get-user-trophys-trophys-service" }, { userId: userId })
  }

  async getUserSuccess(userId: string) {
    return await this.clientRewardService.send({ cmd: "get-user-success-success-service" }, { userId: userId })
  }

  async getUserLockedSuccess(userId: string) {
    return await this.clientRewardService.send({ cmd: "get-locked-success-success-service" }, { userId: userId })
  }
}
