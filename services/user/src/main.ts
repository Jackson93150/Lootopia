import { NestFactory } from "@nestjs/core"

import { AppModule } from "./app.module"
import { MicroserviceOptions, TcpOptions, Transport } from "@nestjs/microservices"

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, 
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3000,
      },
    } as TcpOptions);

  await app.listen();
}

bootstrap()
