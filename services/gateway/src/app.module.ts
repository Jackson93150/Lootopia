import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { AuthController } from "./auth/auth.controller"
import { AuthService } from "./auth/auth.service"
import { UserController } from "./user/user.controller"
import { UserService } from "./user/user.service"
import { StripeController } from "./stripe/stripe.controller"
import { StripeService } from "./stripe/stripe.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: { port: 3000 },
      },
    ]),
    ClientsModule.register([
      {
        name: "AUTH_SERVICE",
        transport: Transport.TCP,
        options: { port: 3002 },
      },
    ]),
    ClientsModule.register([
      {
        name: "STRIPE_SERVICE",
        transport: Transport.TCP,
        options: { port: 3003 },
      },
    ]),
  ],
  controllers: [UserController, AuthController, StripeController],
  providers: [UserService, AuthService, StripeService],
})
export class GatewayModule {}
