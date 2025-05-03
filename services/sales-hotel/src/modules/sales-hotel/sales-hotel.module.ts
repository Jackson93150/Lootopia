import { Module } from "@nestjs/common"

import { ConfigModule } from "@nestjs/config"
import { FirebaseService } from "../../firebase/firebase.service"
import { SalesHotelController } from "./sales-hotel.controller"
import { SalesHotelService } from "./sales-hotel.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [SalesHotelController],
  providers: [SalesHotelService, FirebaseService],
  exports: [SalesHotelService, FirebaseService],
})
export class SalesHotelModule {}
