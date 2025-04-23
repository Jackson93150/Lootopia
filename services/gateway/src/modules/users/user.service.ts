import { Injectable, Inject, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from './dto/user';
import { AuthService } from '../auth/auth.service';
import { AuthenticatedUser } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly clientUserService: ClientProxy,
    private readonly authService: AuthService
  ) {}

  register(user: UserDto) {
    return this.clientUserService.send({ cmd: 'register-user' }, user);
  }

  precheck(user: UserDto) {
    return this.clientUserService.send({ cmd: 'precheck-user' }, user);
  }

  findById(user_id: string) {
    return this.clientUserService.send({ cmd: 'find-by-id-user' }, user_id);
  }

  me(user: AuthenticatedUser) {
    return this.clientUserService.send({ cmd: 'me-user' }, user);
  }

  async login(authHeader: string | undefined) {
    if (!authHeader) {
      throw new UnauthorizedException("Missing Authorization header")
    }

    const jwt = this.authService.getJwtToken(authHeader)

    const decodedJwt = await this.authService.verifyIdToken(jwt)

    const userFirestore = await this.findById(decodedJwt.user_id)

    if (!userFirestore) {
      throw new NotFoundException("Utilisateur non trouvé dans Firestore")
    }

    return jwt
  }
}