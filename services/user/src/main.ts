import { NestFactory } from "@nestjs/core"

import { MicroserviceOptions, TcpOptions, Transport } from "@nestjs/microservices"
import { UserModule } from "./modules/user/user.module"

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.TCP,
    options: {
      host: "127.0.0.1",
      port: Number(process.env.PORT),
    },
  } as TcpOptions)

  await app.listen()
}

bootstrap()
