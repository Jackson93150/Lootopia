import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { FirebaseService } from "src/firebase/firebase.service"
import { CrownPackageDocument } from "./types/package"

@Injectable()
export class CrownService {
  constructor(private readonly firebaseService: FirebaseService) {}

  public async getCrownPackages() {
    const snapshotCrownPackages = await this.firebaseService.crownPackagesCollectionRef.get()

    const crownPackages: CrownPackageDocument[] = snapshotCrownPackages.docs.map(doc => ({
      id_firebase: doc.id,
      ...doc.data(),
    }))

    return crownPackages
  }

  public async getCrownPackageById(id: string) {
    try {
      const doc = await this.firebaseService.crownPackagesCollectionRef.doc(id).get()

      if (!doc.exists) {
        throw new InternalServerErrorException(`Le crown package avec l'ID ${id} n'existe pas.`)
      }

      return {
        id_firebase: doc.id,
        ...doc.data(),
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du crown package :", error)
      throw new InternalServerErrorException("Impossible de récupérer le crown package")
    }
  }
}
