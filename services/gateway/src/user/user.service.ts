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

  async updateBiography(user: AuthenticatedUser & { biographie: string }) {
    return await this.clientUserService.send(
      { cmd: "update-biography-user-service" },
      {
        id: user.id,
        biographie: user.biographie,
      },
    )
  }

  async uploadProfilePicture(uid: string, file: Express.Multer.File) {
    return await this.clientUserService.send(
      { cmd: "upload-profile-picture-user-service" },
      {
        uid,
        file: {
          buffer: file.buffer,
          mimetype: file.mimetype,
          originalname: file.originalname,
        },
      },
    )
  }
}
