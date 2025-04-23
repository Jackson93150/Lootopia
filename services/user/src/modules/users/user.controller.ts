import {
  Body,
  Controller,
  NotFoundException,
  Param,
} from "@nestjs/common"

import type { AuthenticatedUserDto } from "./dto/auth.dto"
import type { UserDto } from "./dto/user.dto"
import { UserService } from "./user.service"
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @MessagePattern({ cmd: 'register-user' })
  async register(@Body() userDto: UserDto) {
    return await this.userService.register(userDto)
  }

  @MessagePattern({ cmd: 'find-by-id-user' })
  async getUserById(@Param("id") id: string) {
    try {
      const user = await this.userService.getById(id)
      return { user }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé`)
      }
      throw error
    }
  }

  @MessagePattern({ cmd: 'me-user' })
  async getMe(@Body() user: AuthenticatedUserDto) {
    return await this.userService.me(user)
  }

  @MessagePattern({ cmd: 'precheck-user' })
  async precheck(@Body() userDto: UserDto) {
    return await this.userService.precheck(userDto)
  }
}
