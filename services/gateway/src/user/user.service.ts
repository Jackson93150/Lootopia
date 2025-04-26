import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { AuthenticatedUser } from "../auth/dto/auth.dto"
import { UserDto } from "./dto/user"

@Injectable()
export class UserService {
  constructor(@Inject("USER_SERVICE") private readonly clientUserService: ClientProxy) {}

  async precheck(user: UserDto) {
    return await this.clientUserService.send({ cmd: "precheck-user-service" }, user)
  }

  async findById(user_id: string) {
    return await this.clientUserService.send({ cmd: "find-by-id-user-service" }, user_id)
  }

  async me(user: AuthenticatedUser) {
    return await this.clientUserService.send({ cmd: "me-user-service" }, user)
  }
}
