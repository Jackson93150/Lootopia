import { NestFactory } from "@nestjs/core"
import * as cookieParser from "cookie-parser"
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GatewayModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule, {
    rawBody: true,
  })
  app.use(cookieParser())
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })

  const config = new DocumentBuilder().build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
