import { NestFactory } from "@nestjs/core"
import * as cookieParser from "cookie-parser"
import { GatewayModule } from "./app.module"
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule)
  app.use(cookieParser())
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
