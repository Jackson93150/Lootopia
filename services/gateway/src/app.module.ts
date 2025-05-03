import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { AuthController } from "./auth/auth.controller"
import { AuthService } from "./auth/auth.service"
import { UserController } from "./user/user.controller"
import { UserService } from "./user/user.service"
import { StripeController } from "./stripe/stripe.controller"
import { StripeService } from "./stripe/stripe.service"
import { ArtefactController } from "./artefact/artefact.controller"
import { ArtefactService } from "./artefact/artefact.service"
import { SalesHotelController } from "./sales-hotel/sales-hotel.controller"
import { SalesHotelService } from "./sales-hotel/sales-hotel.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: { port: Number(process.env.USER_SERVICE_PORT) },
      },
    ]),
    ClientsModule.register([
      {
        name: "AUTH_SERVICE",
        transport: Transport.TCP,
        options: { port: Number(process.env.AUTH_SERVICE_PORT) },
      },
    ]),
    ClientsModule.register([
      {
        name: "STRIPE_SERVICE",
        transport: Transport.TCP,
        options: { port: Number(process.env.STRIPE_SERVICE_PORT) },
      },
    ]),
    ClientsModule.register([
    {
        name: "SALES_HOTEL_SERVICE",
        transport: Transport.TCP,
        options: { port: Number(process.env.SALES_HOTEL_SERVICE_PORT) },
      },
    ]),
    ClientsModule.register([
      {
        name: "ARTEFACT_SERVICE",
        transport: Transport.TCP,
        options: { port: Number(process.env.ARTEFACT_SERVICE_PORT) },
      },
    ]),
  ],
  controllers: [UserController, AuthController, ArtefactController, SalesHotelController, StripeController],
  providers: [UserService, AuthService, ArtefactService, SalesHotelService, StripeService],
})
export class GatewayModule {}
