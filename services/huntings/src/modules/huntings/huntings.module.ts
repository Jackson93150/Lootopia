import { Module } from "@nestjs/common"

import { ConfigModule } from "@nestjs/config"
import { FirebaseService } from "../../firebase/firebase.service"
import { HuntingsController } from "./huntings.controller"
import { HuntingsService } from "./huntings.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [HuntingsController],
  providers: [HuntingsService, FirebaseService],
  exports: [HuntingsService, FirebaseService],
})
export class HuntingsModule {}
