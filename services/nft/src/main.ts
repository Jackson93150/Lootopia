import { NestFactory } from "@nestjs/core"

import { MicroserviceOptions, TcpOptions, Transport } from "@nestjs/microservices"
import { NftModule } from "./modules/nft/nft.module"

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(NftModule, {
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: Number(process.env.PORT),
    },
  } as TcpOptions)

  await app.listen()
}

bootstrap()
