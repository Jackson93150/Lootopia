import { Module } from "@nestjs/common"

import { ConfigModule, ConfigService } from "@nestjs/config"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { FirebaseService } from "../../firebase/firebase.service"
import { CrownService } from "../crown/crown.service"
import { StripeController } from "./stripe.controller"
import { StripeService } from "./stripe.service"

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
  ],
  controllers: [StripeController],
  providers: [
    StripeService,
    FirebaseService,
    CrownService,
    {
      provide: "STRIPE_API_KEY",
      useFactory: async (configService: ConfigService) => configService.get("STRIPE_API_KEY"),
      inject: [ConfigService],
    },
  ],
  exports: [StripeService, FirebaseService],
})
export class StripeModule {}
