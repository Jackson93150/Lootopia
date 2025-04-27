import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common"

import { ClientProxy } from "@nestjs/microservices"
import { firstValueFrom } from "rxjs"
import { FirebaseService } from "src/firebase/firebase.service"

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    @Inject("USER_SERVICE") private readonly clientUserService: ClientProxy,
  ) {}

  async register(user) {
    try {
      if (user.uid) {
        await this.firebaseService.firestore.collection("users").doc(user.uid).set({
          email: user.email,
          username: user.username,
          biographie: null,
          logo_url: null,
          localisation: null,
          solde: 0,
          double_authentification: false,
          last_login: null,
          role: 'commun',
          xp: 0,
          id_partenaire: null,
          id_rang: 'XzXzRJXkM5OgsYdpCDF1',
          statut: 'actif'
        })

        return user
      }
    } catch (error) {
      if (error.code === "auth/email-already-exists") {
        throw new ConflictException("Un compte avec cette adresse email existe déjà.")
      }
      throw error
    }
  }

  async login(authHeader) {
    const jwt = this.getJwtToken(authHeader)

    const decodedJwt = await this.verifyIdToken(jwt)

    const userFirestore = await firstValueFrom(this.clientUserService.send({ cmd: "find-by-id-user-service" }, decodedJwt ))

    if (!userFirestore) {
      throw new NotFoundException("Utilisateur non trouvé dans Firestore")
    }

    return jwt;
  }

  public async verifyIdToken(idToken: string) {
    return await this.firebaseService.auth.verifyIdToken(idToken, true)
  }

  public getJwtToken(authorization: string) {
    if (authorization.startsWith("Bearer ")) return authorization.substring(7)

    return authorization
  }
}
