import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { AuthDecorator } from '../auth/decorators/auth.decorator';
import { AuthenticatedUser } from '../auth/dto/auth.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserDto } from './dto/user';

@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() userDto: UserDto) {
    return await this.userService.register(userDto);
  }

  @UseGuards(AuthGuard)
  @Get('login')
  login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const jwt = this.authService.getJwtToken(authHeader);

    res.cookie('jwt', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });

    return { message: 'JWT saved in cookie' };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@AuthDecorator() user: AuthenticatedUser) {
    return await this.userService.me(user);
  }
}
