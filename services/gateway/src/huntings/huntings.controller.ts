import { Controller } from "@nestjs/common"

import { HuntingsService } from "./huntings.service"

@Controller("/huntings")
export class HuntingsController {
  constructor(private readonly clientHuntingsService: HuntingsService) {}

}
