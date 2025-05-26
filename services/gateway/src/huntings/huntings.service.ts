import { Inject, Injectable } from "@nestjs/common"

import { ClientProxy } from "@nestjs/microservices"

@Injectable()
export class HuntingsService {
  constructor(@Inject("HUNTINGS_SERVICE") private readonly clientHuntingsService: ClientProxy) {}

  async createDraft(hunting) {
    this.clientHuntingsService.send({ cmd: 'create-draft-hunting-service' }, { hunting })
  }
}
