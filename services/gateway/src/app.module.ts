import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { AuthController } from "./auth/auth.controller"
import { AuthService } from "./auth/auth.service"
import { RewardController } from "./reward/reward.controller"
import { RewardService } from "./reward/reward.service"
import { SalesHotelController } from "./sales-hotel/sales-hotel.controller"
import { SalesHotelService } from "./sales-hotel/sales-hotel.service"
import { StripeController } from "./stripe/stripe.controller"
import { StripeService } from "./stripe/stripe.service"
import { UserController } from "./user/user.controller"
import { UserService } from "./user/user.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: {
          host: process.env.USER_SERVICE_HOST,
          port: Number(process.env.PORT),
        },
      },
      {
        name: "AUTH_SERVICE",
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVICE_HOST,
          port: Number(process.env.PORT),
        },
      },
      {
        name: "STRIPE_SERVICE",
        transport: Transport.TCP,
        options: {
          host: process.env.STRIPE_SERVICE_HOST,
          port: Number(process.env.PORT),
        },
      },
      {
        name: "SALES_HOTEL_SERVICE",
        transport: Transport.TCP,
        options: {
          host: process.env.SALES_HOTEL_SERVICE_HOST,
          port: Number(process.env.PORT),
        },
      },
      {
        name: "REWARDS_SERVICE",
        transport: Transport.TCP,
        options: {
          host: process.env.REWARDS_SERVICE_HOST,
          port: Number(process.env.PORT),
        },
      },
    ]),
  ],
  controllers: [UserController, AuthController, StripeController, RewardController, SalesHotelController],
  providers: [UserService, AuthService, StripeService, RewardService, SalesHotelService],
})
export class GatewayModule {}
