import { NestFactory } from "@nestjs/core"

import { MicroserviceOptions, TcpOptions, Transport } from "@nestjs/microservices"
import { HuntModule } from "./modules/huntings/huntings.module"

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(HuntModule, {
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: Number(process.env.PORT),
    },
  } as TcpOptions)

  await app.listen()
}

bootstrap()
