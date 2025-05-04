import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

@Injectable()
export class RewardService {
  constructor(@Inject("REWARDS_SERVICE") private readonly clientRewardService: ClientProxy) {}

  async getUserArtefact(userId: string) {
    return await this.clientRewardService.send({ cmd: 'get-user-artefacts-artefacts-service' }, { userId: userId })
  }
}
