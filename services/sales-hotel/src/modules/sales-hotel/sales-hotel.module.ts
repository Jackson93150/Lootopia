import { Module } from "@nestjs/common"

import { ConfigModule } from "@nestjs/config"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { ScheduleModule } from "@nestjs/schedule"
import { FirebaseService } from "../../firebase/firebase.service"
import { TypesenseService } from "../typesense/typesense.service"
import { SalesHotelController } from "./sales-hotel.controller"
import { SalesHotelService } from "./sales-hotel.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: "REWARDS_SERVICE",
        transport: Transport.TCP,
        options: { host: process.env.REWARDS_SERVICE_HOST, port: Number(process.env.REWARDS_SERVICE_PORT) },
      },
    ]),
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: { host: process.env.USER_SERVICE_HOST, port: Number(process.env.USER_SERVICE_PORT) },
      },
    ]),
  ],
  controllers: [SalesHotelController],
  providers: [SalesHotelService, FirebaseService, TypesenseService],
  exports: [SalesHotelService, FirebaseService],
})
export class SalesHotelModule {}
