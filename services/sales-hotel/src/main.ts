import { NestFactory } from "@nestjs/core"

import { MicroserviceOptions, TcpOptions, Transport } from "@nestjs/microservices"
import { SalesHotelModule } from "./modules/sales-hotel/sales-hotel.module"

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SalesHotelModule, {
    transport: Transport.TCP,
    options: {
      host: "127.0.0.1",
      port: process.env.PORT,
    },
  } as TcpOptions)

  await app.listen()
}

bootstrap()
