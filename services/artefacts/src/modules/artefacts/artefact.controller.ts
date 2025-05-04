import { Body, Controller, NotFoundException, Param } from "@nestjs/common"

import { MessagePattern, Payload } from "@nestjs/microservices"
import { ArtefactService } from "./artefact.service"

@Controller()
export class ArtefactController {
  constructor(private readonly artefactService: ArtefactService) {}

  @MessagePattern({ cmd: 'get-all-artefacts-service' })
  async getAllArtefacts() {
    return await this.artefactService.getAllArtefacts();
  }

  @MessagePattern({ cmd: 'get-user-artefacts-artefacts-service' })
  async getUserArtefacts(@Body() user: { userId: string }) {
    return await this.artefactService.getUserArtefact(user.userId);
  }

  @MessagePattern({ cmd: 'get-by-ids-artefacts-service' })
  async getArtefactsByIds(@Body('artefactIds') artefactsIds) {
    return await this.artefactService.getArtefactsByIds(artefactsIds);
  }

  @MessagePattern({ cmd: 'remove-owner-artefacts-service' })
  async removeOwnerArtefact(@Body() userIdAndArtefactId: { userId: string, artefactId: string }) {
    return await this.artefactService.removeOwnerArtefact(userIdAndArtefactId.userId, userIdAndArtefactId.artefactId);
  }
}
