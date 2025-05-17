import { Body, Controller, Post } from "@nestjs/common"

import { HuntingsService } from "./huntings.service"

@Controller("/huntings")
export class HuntingsController {
  constructor(private readonly clientHuntingsService: HuntingsService) {}

  @Post("/create-draft")
  async createDraft(@Body() hunting) {
    return await this.clientHuntingsService.createDraft(hunting)
  }
}
