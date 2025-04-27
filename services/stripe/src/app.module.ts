import { Module } from "@nestjs/common"

import { ConfigModule } from "@nestjs/config"
import { CrownModule } from "./modules/crown/crown.module"
import { StripeModule } from "./modules/stripe/stripe.module"

@Module({
  imports: [
    CrownModule,
    StripeModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
