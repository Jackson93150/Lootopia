import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import type { DocumentReference, Transaction } from "firebase-admin/firestore"

import type { AuthenticatedUserDto } from "./dto/auth.dto"
import { FirebaseService } from "../firebase/firebase.service"
import type { UserDto } from "./dto/user.dto"
import type { UserDocument } from "./types/user.type"

@Injectable()
export class UserService {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  async register(user: UserDto) {
    try {
      if (user.uid) {
        await this.firebaseService.firestore.collection("users").doc(user.uid).set({
          email: user.email,
          username: user.username,
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

  async precheck(user: UserDto) {
    const existingUsernameQuery = await this.firebaseService.firestore
      .collection("users")
      .where("username", "==", user.username)
      .limit(1)
      .get()

    if (!existingUsernameQuery.empty) {
      throw new ConflictException("Ce nom d'utilisateur est déjà pris.")
    }

    try {
      await this.firebaseService.auth.getUserByEmail(user.email)
      throw new ConflictException("Un compte avec cette adresse email existe déjà.")
    } catch (err) {
      if (err.code !== "auth/user-not-found") {
        throw err
      }
    }
  }

  public async me(authUser: AuthenticatedUserDto) {
    const { id } = authUser
    const auth = await this.firebaseService.getUser(id)

    if (auth.email === undefined) {
      throw new Error("Email is missing from Firebase Auth.")
    }

    const userRef = this.getRef(id)
    const existingUserDocument = await this.findByRef(userRef)
    return {
      user: existingUserDocument,
    }
  }

  public async getById(id: string) {
    const user = await this.findById(id)

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé`)
    }

    return user
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
