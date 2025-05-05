import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { AuthController } from "./auth/auth.controller"
import { AuthService } from "./auth/auth.service"
import { RewardController } from "./reward/reward.controller"
import { RewardService } from "./reward/reward.service"
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
        name: "REWARDS_SERVICE",
        transport: Transport.TCP,
        options: { port: Number(process.env.REWARDS_SERVICE_PORT) },
      },
    ]),
  ],
  controllers: [UserController, AuthController, StripeController, RewardController],
  providers: [UserService, AuthService, StripeService, RewardService],
})
export class GatewayModule {}
