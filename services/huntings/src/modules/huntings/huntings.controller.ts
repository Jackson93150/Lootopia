import { Controller } from "@nestjs/common"

import { HuntingsService } from "./huntings.service"

@Controller()
export class HuntingsController {
  constructor(private readonly huntingsService: HuntingsService) {}

}
