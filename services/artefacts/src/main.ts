import { NestFactory } from "@nestjs/core"

import { MicroserviceOptions, TcpOptions, Transport } from "@nestjs/microservices"
import { ArtefactModule } from "./modules/artefacts/artefact.module"

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ArtefactModule, {
    transport: Transport.TCP,
    options: {
      host: "127.0.0.1",
      port: process.env.PORT ?? 3000,
    },
  } as TcpOptions)

  await app.listen()
}

bootstrap()
