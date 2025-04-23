import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './modules/users/user.controller';
import { UserService } from './modules/users/user.service';
import { AuthService } from './modules/auth/auth.service';
import { FirebaseService } from './modules/firebase/firebase.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: { port: 3000 }
      }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, FirebaseService],
})
export class GatewayModule {}