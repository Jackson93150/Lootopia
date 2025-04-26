import { NestFactory } from "@nestjs/core"

import { MicroserviceOptions, TcpOptions, Transport } from "@nestjs/microservices"
import { AuthModule } from "./modules/auth/auth.module"

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: "127.0.0.1",
      port: 3002,
    },
  } as TcpOptions)

  await app.listen()
}

bootstrap()
