import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common"
import type { Request, Response } from "express"

import { AuthGuard } from "../auth/guards/auth.guard"
import { AuthService } from "./auth.service"
import { UserDto } from "./dto/user.dto"

@Controller("/auth")
export class AuthController {
  constructor(private readonly clientAuthService: AuthService) {}

  @Post("/register")
  async register(@Body() userDto: UserDto) {
    return await this.clientAuthService.register(userDto)
  }

  @UseGuards(AuthGuard)
  @Get("login")
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      throw new UnauthorizedException("Missing Authorization header")
    }

    const jwt = await this.clientAuthService.login(authHeader)

    res.cookie("jwt", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    })

    return { message: "JWT saved in cookie" }
  }
}
