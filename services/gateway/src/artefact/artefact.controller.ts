import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from "@nestjs/common"
import { ArtefactService } from "./artefact.service"
import { AuthGuard } from "src/auth/guards/auth.guard"
import { AuthDecorator } from "src/auth/decorators/auth.decorator"
import { AuthenticatedUser } from "src/auth/dto/auth.dto"

@Controller("/artefact")
export class ArtefactController {
  constructor(private readonly clientArtefactService: ArtefactService) {}

  @Get("all")
  async getAll() {
      return await this.clientArtefactService.getAll()
  }

  @Get("user-artefact")
  @UseGuards(AuthGuard)
  async getUserArtefact(@AuthDecorator() user: AuthenticatedUser) {
      return await this.clientArtefactService.getUserArtefact(user.id)
  }
}
