import { Module } from "@nestjs/common"

import { ConfigModule } from "@nestjs/config"
import { FirebaseService } from "../../firebase/firebase.service"
import { TrophyController } from "./trophy.controller"
import { TrophyService } from "./trophy.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [TrophyController],
  providers: [TrophyService, FirebaseService],
  exports: [TrophyService, FirebaseService],
})
export class TrophyModule {}
