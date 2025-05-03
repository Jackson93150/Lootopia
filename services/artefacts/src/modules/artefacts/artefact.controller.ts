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
    console.log(user.userId)
    return await this.artefactService.getUserArtefact(user.userId);
  }
}
