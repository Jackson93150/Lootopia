import { Body, Controller } from "@nestjs/common"

import { MessagePattern } from "@nestjs/microservices"
import { ArtefactService } from "./artefact.service"

@Controller()
export class ArtefactController {
  constructor(private readonly artefactService: ArtefactService) {}

  @MessagePattern({ cmd: "get-all-artefacts-service" })
  async getAllArtefacts() {
    return await this.artefactService.getAllArtefacts()
  }

  @MessagePattern({ cmd: "get-user-artefacts-artefacts-service" })
  async getUserArtefacts(@Body() user: { userId: string }) {
    return await this.artefactService.getUserArtefacts(user.userId)
  }

  @MessagePattern({ cmd: "get-by-ua-ids-artefacts-service" })
  async getArtefactsByUserArtefactIdsForAuction(@Body("userArtefactIds") userArtefactIds) {
    return await this.artefactService.getArtefactsByUserArtefactIdsForAuction(userArtefactIds)
  }

  @MessagePattern({ cmd: "modify-auction-state-ua-artefacts-service" })
  async modifyAuctionStateUserArtefact(@Body() userArtefactIdAndAuctionState) {
    console.log(userArtefactIdAndAuctionState)
    return await this.artefactService.modifyAuctionStateUserArtefact(
      userArtefactIdAndAuctionState.userArtefactId,
      userArtefactIdAndAuctionState.auction,
    )
  }
}
