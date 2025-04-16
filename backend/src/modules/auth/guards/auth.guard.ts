import { type CanActivate, type ExecutionContext, Injectable } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import type { Request } from "express"

import type { AuthService } from "../auth.service"
import { AuthenticatedUser } from "../dto/auth.dto"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()

    const cookieToken = request.cookies?.jwt as string | undefined
    const authHeader = request.headers.authorization

    const jwt = cookieToken ?? (authHeader ? this.authService.getJwtToken(authHeader) : null)

    if (!jwt) return false

    try {
      const decodedJwt = await this.authService.verifyIdToken(jwt)

      request.user = plainToInstance(AuthenticatedUser, {
        id: decodedJwt.sub,
      })

      return true
    } catch (error) {
      return error
    }
  }
}
