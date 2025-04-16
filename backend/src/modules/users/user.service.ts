import { Injectable } from "@nestjs/common"
import type { DocumentReference, Transaction } from "firebase-admin/firestore"

import type { AuthService } from "../auth/auth.service"
import type { AuthenticatedUser } from "../auth/dto/auth.dto"
import type { FirebaseService } from "../firebase/firebase.service"
import type { UserDto } from "./dto/user"
import type { UserDocument } from "./types/user"

@Injectable()
export class UserService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly authService: AuthService,
  ) {}

  async register(user: UserDto) {
    const userRecord = await this.firebaseService.auth.createUser({
      email: user.email,
      password: user.password,
    })

    await this.firebaseService.firestore.collection("users").doc(userRecord.uid).set({
      email: user.email,
      username: user.username,
    })

    return userRecord
  }

  public async me(authUser: AuthenticatedUser) {
    const { id } = authUser
    const auth = await this.authService.getUser(id)

    if (auth.email === undefined) {
      throw new Error("Email is missing from Firebase Auth.")
    }

    const userRef = this.getRef(id)
    const existingUserDocument = await this.findByRef(userRef)
    return {
      user: existingUserDocument,
    }
  }

  public getRef(id: string) {
    return this.firebaseService.usersCollectionRef.doc(id)
  }

  public async findByRef(ref: DocumentReference<UserDocument>, tx?: Transaction) {
    const docSnapshot = await (tx ? tx.get(ref) : ref.get())
    if (!docSnapshot.exists) return null

    const userDoc = docSnapshot.data()
    if (userDoc === undefined) return null

    return userDoc
  }

  public async findById(id: string, tx?: Transaction) {
    const docRef = this.getRef(id)

    const docSnapshot = await (tx ? tx.get(docRef) : docRef.get())
    if (!docSnapshot.exists) return null

    const userDoc = docSnapshot.data()
    if (userDoc === undefined) return null

    return userDoc
  }
}
