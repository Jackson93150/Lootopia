import { Controller, Get } from "@nestjs/common"

@Controller()
export class AppController {
  @Get("/healthz")
  healthcheck() {
    return {
      healthy: true,
    }
  }
}
