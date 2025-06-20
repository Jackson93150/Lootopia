import { Module } from "@nestjs/common"
import { HuntController } from "./huntings.controller"
import { HuntService } from "./huntings.service"
import { FirebaseService } from "../../firebase/firebase.service"

@Module({
  controllers: [HuntController],
  providers: [HuntService, FirebaseService],
  exports: [HuntService],
})
export class HuntModule {}
