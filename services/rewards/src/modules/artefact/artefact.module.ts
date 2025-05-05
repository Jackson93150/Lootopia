import { Module } from "@nestjs/common"

import { ConfigModule } from "@nestjs/config"
import { FirebaseService } from "../../firebase/firebase.service"
import { ArtefactController } from "./artefact.controller"
import { ArtefactService } from "./artefact.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ArtefactController],
  providers: [ArtefactService, FirebaseService],
  exports: [ArtefactService, FirebaseService],
})
export class ArtefactModule {}
