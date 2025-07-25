import { Body, Controller } from "@nestjs/common"

import { MessagePattern } from "@nestjs/microservices"
import { ArtefactService } from "./artefact.service"
import { ArtefactFilterOptions } from "./types/filters"

@Controller()
export class ArtefactController {
  constructor(private readonly artefactService: ArtefactService) {}

  @MessagePattern({ cmd: "get-user-artefacts-artefacts-service" })
  async getUserArtefacts(@Body() data: { userId: string; filters?: ArtefactFilterOptions }) {
    return await this.artefactService.getUserArtefacts(data.userId, data.filters)
  }

  @MessagePattern({ cmd: "get-artefacts-artefacts-service" })
  async getArtefacts() {
    return await this.artefactService.getArtefacts()
  }

  @MessagePattern({ cmd: "create-ua-artefacts-service" })
  async createUserArtefact(@Body() body) {
    return await this.artefactService.createUserArtefactAfterSale(body.userId, body.artefactId)
  }

  @MessagePattern({ cmd: "modify-auction-state-ua-artefacts-service" })
  async modifyAuctionStateUserArtefact(@Body() userArtefactIdAndAuctionState) {
    return await this.artefactService.modifyAuctionStateUserArtefact(
      userArtefactIdAndAuctionState.userArtefactId,
      userArtefactIdAndAuctionState.auction,
    )
  }

  @MessagePattern({ cmd: "modify-saled-state-ua-artefacts-service" })
  async modifySaledStateUserArtefact(@Body() userArtefactIdAndAuctionState) {
    return await this.artefactService.modifySaledStateUserArtefact(
      userArtefactIdAndAuctionState.userArtefactId,
      userArtefactIdAndAuctionState.saled,
    )
  }
}
