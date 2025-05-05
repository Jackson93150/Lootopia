import { Inject, Injectable } from "@nestjs/common"

import { ClientProxy } from "@nestjs/microservices"
import { UserDto } from "./dto/user.dto"

@Injectable()
export class AuthService {
  constructor(@Inject("AUTH_SERVICE") private readonly clientAuthService: ClientProxy) {}

  public async register(user: UserDto) {
    return await this.clientAuthService.send({ cmd: "register-user-auth-service" }, user)
  }

  public getJwtToken(authorization: string) {
    if (authorization.startsWith("Bearer ")) return authorization.substring(7)
  
    return authorization
  }
}
