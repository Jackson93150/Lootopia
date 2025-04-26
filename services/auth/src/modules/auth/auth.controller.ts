import { Body, Controller, Param } from "@nestjs/common"

import { MessagePattern } from "@nestjs/microservices"
import { AuthService } from "./auth.service"

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: "register-user-auth-service" })
  async register(@Body() userDto) {
    return await this.authService.register(userDto)
  }

  @MessagePattern({ cmd: "login-user-auth-service" })
  async login(@Body() authHeader) {
    return await this.authService.login(authHeader)
  }

  @MessagePattern({ cmd: "verify-id-token-auth-service" })
  async verifyIdToken(@Body() idToken: string) {
    return await this.authService.verifyIdToken(idToken)
  }
}
