import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { ArtefactFilterOptions } from "./types/filters"

@Injectable()
export class RewardService {
  constructor(@Inject("REWARDS_SERVICE") private readonly clientRewardService: ClientProxy) {}

  async getUserArtefact(id: string, filters?: ArtefactFilterOptions) {
    return await this.clientRewardService.send({ cmd: "get-user-artefacts-artefacts-service" }, { userId: id, filters })
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

  async getUsersXp() {
    return await this.clientRewardService.send({ cmd: "get-users-xp-xp-service" }, {})
  }
}
