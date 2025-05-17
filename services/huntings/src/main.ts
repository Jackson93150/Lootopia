import { NestFactory } from "@nestjs/core"

import { MicroserviceOptions, TcpOptions, Transport } from "@nestjs/microservices"
import { HuntingsModule } from "./modules/huntings/huntings.module"

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(HuntingsModule, {
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: Number(process.env.PORT),
    },
  } as TcpOptions)

  await app.listen()
}

bootstrap()
