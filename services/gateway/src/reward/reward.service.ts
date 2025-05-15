import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

@Injectable()
export class RewardService {
  constructor(@Inject("REWARDS_SERVICE") private readonly clientRewardService: ClientProxy) {}

  async getUserArtefact(id: string) {
    return await this.clientRewardService.send({ cmd: "get-user-artefacts-artefacts-service" }, { userId: id })
  }

  async getArtefacts() {
    return await this.clientRewardService.send({ cmd: "get-artefacts-artefacts-service" }, {})
  }

  async getUserTrophys(id: string) {
    return await this.clientRewardService.send({ cmd: "get-user-trophys-trophys-service" }, { userId: id })
  }

  async getUserSuccess(id: string) {
    return await this.clientRewardService.send({ cmd: "get-user-success-success-service" }, { userId: id })
  }

  async getUserLockedSuccess(id: string) {
    return await this.clientRewardService.send({ cmd: "get-locked-success-success-service" }, { userId: id })
  }
}
