import { NestFactory } from "@nestjs/core"

import { MicroserviceOptions, TcpOptions, Transport } from "@nestjs/microservices"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    rawBody: true,
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: Number(process.env.PORT),
    },
  } as TcpOptions)

  await app.listen()
}

bootstrap()
