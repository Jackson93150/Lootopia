import { type CanActivate, type ExecutionContext, Inject, Injectable } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import type { Request } from "express"

import { ClientProxy } from "@nestjs/microservices"
import { firstValueFrom } from "rxjs"
import { AuthService } from "../auth.service"
import { AuthenticatedUser } from "../dto/auth.dto"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    @Inject("AUTH_SERVICE") private readonly clientFirebaseService: ClientProxy,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()

    const cookieToken = request.cookies?.jwt as string | undefined
    const authHeader = request.headers.authorization
    
    const jwt = cookieToken ?? (authHeader ? this.authService.getJwtToken(authHeader) : null)

    if (!jwt) return false

    try {
      const decodedJwt = await firstValueFrom(
        this.clientFirebaseService.send({ cmd: "verify-id-token-auth-service" }, jwt),
      )

      request.user = plainToInstance(AuthenticatedUser, {
        id: decodedJwt.sub,
      })

      return true
    } catch (error) {
      return error
    }
  }
}
