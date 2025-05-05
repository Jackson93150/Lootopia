import { Body, Controller, Get, NotFoundException, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common"

import { AuthDecorator } from "../auth/decorators/auth.decorator"
import { AuthenticatedUser } from "../auth/dto/auth.dto"
import { AuthGuard } from "../auth/guards/auth.guard"
import { UserDto } from "./dto/user"
import { UserService } from "./user.service"
import { FileInterceptor } from "@nestjs/platform-express"

@Controller("/users")
export class UserController {
  constructor(private readonly clientUserService: UserService) {}

  @Post("precheck")
  async precheck(@Body() userDto: UserDto) {
    return await this.clientUserService.precheck(userDto)
  }

  @UseGuards(AuthGuard)
  @Get("user/:id")
  async getUserById(@Param("id") id: string) {
      return await this.clientUserService.findById(id)
  }

  @UseGuards(AuthGuard)
  @Get("me")
  async getMe(@AuthDecorator() user: AuthenticatedUser) {
    return await this.clientUserService.me(user)
  }

  @UseGuards(AuthGuard)
  @Post("upload-profile-picture")
  @UseInterceptors(FileInterceptor("file"))
  async uploadProfilePicture(
    @AuthDecorator() user: AuthenticatedUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (!file) throw new NotFoundException("Fichier manquant.")
      return await this.clientUserService.uploadProfilePicture(user.id, file)
    } catch (error) {
      console.error("Erreur upload-profile-picture:", error)
      throw error
    }
  }
  
}
