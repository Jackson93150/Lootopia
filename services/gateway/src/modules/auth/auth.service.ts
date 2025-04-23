import { Injectable } from "@nestjs/common"

import { FirebaseService } from "../firebase/firebase.service"

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  public getJwtToken(authorization: string) {
    if (authorization.startsWith("Bearer ")) return authorization.substring(7)

    return authorization
  }

  public async verifyIdToken(idToken: string) {
    return await this.firebaseService.auth.verifyIdToken(idToken, true)
  }

  public async getUser(id: string) {
    return await this.firebaseService.auth.getUser(id)
  }
}
