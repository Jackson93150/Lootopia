import { Body, Controller, Post } from "@nestjs/common"

import { AuthService } from "./auth.service"
import { UserDto } from "./dto/user.dto"

@Controller("/auth")
export class AuthController {
  constructor(private readonly clientAuthService: AuthService) {}

  @Post("/register")
  async register(@Body() userDto: UserDto) {
    return await this.clientAuthService.register(userDto)
  }
}
