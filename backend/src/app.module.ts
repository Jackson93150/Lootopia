import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AppController } from "./app.controller"
import { AuthModule } from "./modules/auth/auth.module"
import { FirebaseModule } from "./modules/firebase/firebase.module"
import { UserModule } from "./modules/users/user.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirebaseModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
