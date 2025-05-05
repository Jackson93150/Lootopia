import * as path from "node:path"
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import type { DocumentReference, Transaction } from "firebase-admin/firestore"
import { v4 as uuidv4 } from "uuid"
import { FirebaseService } from "../../firebase/firebase.service"
import type { AuthenticatedUserDto } from "./dto/auth.dto"
import type { UserDto } from "./dto/user.dto"

@Injectable()
export class UserService {
  constructor(private readonly firebaseService: FirebaseService) {}

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
      if (err.code === "auth/user-not-found") {
        return true
      }
    }
  }

  public async me(authUser: AuthenticatedUserDto) {
    const { id } = authUser
    const auth = await this.firebaseService.auth.getUser(id)

    if (auth.email === undefined) {
      throw new Error("Email is missing from Firebase Auth.")
    }

    const userRef = await this.getRef(id)

    const existingUserDocument = await this.findByRef(userRef)
    return {
      user: existingUserDocument,
    }
  }

  public async addCrown(userId: string, amountCrown) {
    const user = await this.getById(userId)

    const newAmountCrown = user.solde + amountCrown

    await this.firebaseService.usersCollectionRef.doc(userId).update({
      solde: newAmountCrown,
    })
  }

  async uploadProfilePictureAndUpdate(id: string, file: Express.Multer.File): Promise<{ logo_url: string }> {
    const bucket = this.firebaseService.storage.bucket()

    const extension = path.extname(file.originalname)
    const filename = `user/profile-picture/${id}/${id}${extension}`
    const fileRef = bucket.file(filename)

    await fileRef.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: uuidv4(),
        },
      },
      public: true,
      gzip: true,
    })

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`
    const userRef = this.firebaseService.firestore.collection("users").doc(id.toString())
    await userRef.update({
      logo_url: publicUrl,
    })

    return { logo_url: publicUrl }
  }

  public async getById(id: string) {
    const user = await this.findById(id)

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé`)
    }

    return user
  }

  private async findById(id: string, tx?: Transaction) {
    const docRef = await this.getRef(id)

    const docSnapshot = await (tx ? tx.get(docRef) : docRef.get())
    if (!docSnapshot.exists) return null

    const userDoc = docSnapshot.data()
    if (userDoc === undefined) return null

    return userDoc
  }

  private async findByRef(ref: DocumentReference<UserDto>, tx?: Transaction) {
    const docSnapshot = await (tx ? tx.get(ref) : ref.get())
    if (!docSnapshot.exists) return null

    const userDoc = docSnapshot.data()
    if (userDoc === undefined) return null

    return userDoc
  }

  private async getRef(id: string) {
    return await this.firebaseService.usersCollectionRef.doc(id)
  }
}
