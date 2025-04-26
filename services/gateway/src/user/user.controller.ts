import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from "@nestjs/common"

import { AuthDecorator } from "../auth/decorators/auth.decorator"
import { AuthenticatedUser } from "../auth/dto/auth.dto"
import { AuthGuard } from "../auth/guards/auth.guard"
import { UserDto } from "./dto/user"
import { UserService } from "./user.service"

@Controller("/users")
export class UserController {
  constructor(private readonly clientUserService: UserService) {}

  @Post("precheck")
  async precheck(@Body() userDto: UserDto) {
    return await this.clientUserService.precheck(userDto)
  }

  // @UseGuards(AuthGuard)
  @Get("user/:id")
  async getUserById(@Param("id") id: string) {
      return await this.clientUserService.findById(id)
  }

  @UseGuards(AuthGuard)
  @Get("me")
  async getMe(@AuthDecorator() user: AuthenticatedUser) {
    return await this.clientUserService.me(user)
  }
}
