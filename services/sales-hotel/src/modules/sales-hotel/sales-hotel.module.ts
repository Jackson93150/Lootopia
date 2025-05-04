import { Module } from "@nestjs/common"

import { ConfigModule } from "@nestjs/config"
import { FirebaseService } from "../../firebase/firebase.service"
import { SalesHotelController } from "./sales-hotel.controller"
import { SalesHotelService } from "./sales-hotel.service"
import { ClientsModule, Transport } from "@nestjs/microservices"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: "ARTEFACT_SERVICE",
        transport: Transport.TCP,
        options: { port: Number(process.env.ARTEFACT_SERVICE_PORT) },
      },
    ]),
  ],
  controllers: [SalesHotelController],
  providers: [SalesHotelService, FirebaseService],
  exports: [SalesHotelService, FirebaseService],
})
export class SalesHotelModule {}
