import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common"
import type { Request, Response } from "express"

import { AuthService } from "../auth/auth.service"
import { AuthDecorator } from "../auth/decorators/auth.decorator"
import type { AuthenticatedUser } from "../auth/dto/auth.dto"
import { AuthGuard } from "../auth/guards/auth.guard"
import type { UserDto } from "./dto/user"
import { UserService } from "./user.service"

@Controller("/users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post("register")
  async register(@Body() userDto: UserDto) {
    return await this.userService.register(userDto)
  }

  @UseGuards(AuthGuard)
  @Get("user/:id")
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

  @UseGuards(AuthGuard)
  @Get("login")
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      throw new UnauthorizedException("Missing Authorization header")
    }

    const jwt = this.authService.getJwtToken(authHeader)
    const decodedJwt = await this.authService.verifyIdToken(jwt)

    const userFirestore = await this.userService.findById(decodedJwt.user_id)
    if (!userFirestore) {
      throw new NotFoundException("Utilisateur non trouvé dans Firestore")
    }

    res.cookie("jwt", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    })

    return { message: "JWT saved in cookie" }
  }

  @UseGuards(AuthGuard)
  @Get("me")
  async getMe(@AuthDecorator() user: AuthenticatedUser) {
    return await this.userService.me(user)
  }
}
