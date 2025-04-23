import { Body, Controller, Get, NotFoundException, Param, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import type { Request, Response } from "express"

import { UserService } from './user.service';
import { UserDto } from './dto/user';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthService } from '../auth/auth.service';
import { AuthDecorator } from '../auth/decorators/auth.decorator';
import { AuthenticatedUser } from '../auth/dto/auth.dto';

@Controller('/users')
export class UserController {
  constructor(
    private readonly clientUserService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post("precheck")
  async precheck(@Body() userDto: UserDto) {
    return await this.clientUserService.precheck(userDto)
  }

  @Post('/register')
  async register(@Body() userDto: UserDto) {
    return await this.clientUserService.register(userDto);
  }

  @UseGuards(AuthGuard)
  @Get("user/:id")
  async getUserById(@Param("id") id: string) {
    try {
      const user = await this.clientUserService.findById(id)
      return { user }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé`)
      }
      throw error
    }
  }

  @UseGuards(AuthGuard)
  @Get("me")
  async getMe(@AuthDecorator() user: AuthenticatedUser) {
    return await this.clientUserService.me(user)
  }

  @UseGuards(AuthGuard)
  @Get("login")
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const authHeader = req.headers.authorization

    const jwt = this.clientUserService.login(authHeader)

    res.cookie("jwt", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    })

    return { message: "JWT saved in cookie" }
  }
}