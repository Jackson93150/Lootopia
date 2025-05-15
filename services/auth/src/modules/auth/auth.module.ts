import { Module } from "@nestjs/common"

import { ConfigModule } from "@nestjs/config"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { FirebaseService } from "src/firebase/firebase.service"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: { host: process.env.USER_SERVICE_HOST, port: Number(process.env.USER_SERVICE_PORT) },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, FirebaseService],
  exports: [AuthService, FirebaseService],
})
export class AuthModule {}
