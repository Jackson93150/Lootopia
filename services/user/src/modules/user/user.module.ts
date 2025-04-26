import { Module } from "@nestjs/common"

import { ConfigModule } from "@nestjs/config"
import { FirebaseService } from "../../firebase/firebase.service"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, FirebaseService],
  exports: [UserService, FirebaseService],
})
export class UserModule {}
