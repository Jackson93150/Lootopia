import { NestFactory } from "@nestjs/core"

import { MicroserviceOptions, TcpOptions, Transport } from "@nestjs/microservices"
import { ArtefactModule } from "./modules/artefact/artefact.module"

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ArtefactModule, {
    transport: Transport.TCP,
    options: {
      host: "127.0.0.1",
      port: Number(process.env.PORT),
    },
  } as TcpOptions)

  await app.listen()
}

bootstrap()
