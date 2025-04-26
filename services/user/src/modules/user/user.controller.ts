import { Body, Controller, NotFoundException, Param } from "@nestjs/common"

import { MessagePattern, Payload } from "@nestjs/microservices"
import type { AuthenticatedUserDto } from "./dto/auth.dto"
import type { UserDto } from "./dto/user.dto"
import { UserService } from "./user.service"

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: "find-by-id-user-service" })
  async getUserById(@Body() user_id: any) {
    try {
      const user = await this.userService.getById(user_id.uid)
      return { user }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Utilisateur avec l'id ${user_id.uid} non trouvé`)
      }
      throw error
    }
  }

  @MessagePattern({ cmd: "me-user-service" })
  async getMe(@Body() user: AuthenticatedUserDto) {
    return await this.userService.me(user)
  }

  @MessagePattern({ cmd: "precheck-user-service" })
  async precheck(@Body() userDto: UserDto) {
    const result = await this.userService.precheck(userDto)
    return result
  }
}
