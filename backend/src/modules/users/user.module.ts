import { Module } from "@nestjs/common"

import { AuthModule } from "../auth/auth.module"
import { FirebaseModule } from "../firebase/firebase.module"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"

@Module({
  imports: [FirebaseModule, AuthModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
