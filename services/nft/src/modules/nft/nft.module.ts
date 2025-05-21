import { Module } from "@nestjs/common"

import { ConfigModule } from "@nestjs/config"
import { FirebaseService } from "../../firebase/firebase.service"
import { NftController } from "./nft.controller"
import { NftService } from "./nft.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [NftController],
  providers: [NftService, FirebaseService],
  exports: [NftService, FirebaseService],
})
export class NftModule {}
