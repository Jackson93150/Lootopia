import { Module } from "@nestjs/common"

import { ConfigModule } from "@nestjs/config"
import { FirebaseService } from "../../firebase/firebase.service"
import { CrownController } from "./crown.controller"
import { CrownService } from "./crown.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [CrownController],
  providers: [CrownService, FirebaseService],
  exports: [CrownService, FirebaseService],
})
export class CrownModule {}
