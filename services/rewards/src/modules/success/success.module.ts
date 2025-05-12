import { Module } from "@nestjs/common"

import { ConfigModule } from "@nestjs/config"
import { FirebaseService } from "../../firebase/firebase.service"
import { SuccessController } from "./success.controller"
import { SuccessService } from "./success.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [SuccessController],
  providers: [SuccessService, FirebaseService],
  exports: [SuccessService, FirebaseService],
})
export class SuccessModule {}
