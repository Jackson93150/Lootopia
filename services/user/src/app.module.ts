import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { FirebaseModule } from "./modules/firebase/firebase.module"
import { UserModule } from "./modules/users/user.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirebaseModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
