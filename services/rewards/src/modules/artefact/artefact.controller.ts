import { Body, Controller } from "@nestjs/common"

import { MessagePattern } from "@nestjs/microservices"
import { ArtefactService } from "./artefact.service"

@Controller()
export class ArtefactController {
  constructor(private readonly artefactService: ArtefactService) {}

  @MessagePattern({ cmd: "get-user-artefacts-artefacts-service" })
  async getUserArtefacts(@Body() user: { userId: string }) {
    return await this.artefactService.getUserArtefacts(user.userId)
  }
}
