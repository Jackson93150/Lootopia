import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

@Injectable()
export class ArtefactService {
  constructor(@Inject("ARTEFACT_SERVICE") private readonly clientArtefactService: ClientProxy) {}

  async getAll() {
    return await this.clientArtefactService.send({ cmd: "get-all-artefacts-service" }, {})
  }

  async getUserArtefact(userId: string) {
    return await this.clientArtefactService.send({ cmd: 'get-user-artefacts-artefacts-service' }, { userId: userId })
  }
}
