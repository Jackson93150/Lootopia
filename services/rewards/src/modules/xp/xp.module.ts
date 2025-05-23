import { Module } from "@nestjs/common"

import { ConfigModule } from "@nestjs/config"
import { FirebaseService } from "../../firebase/firebase.service"
import { XpController } from "./xp.controller"
import { XpService } from "./xp.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [XpController],
  providers: [XpService, FirebaseService],
  exports: [XpService, FirebaseService],
})
export class XpModule {}
