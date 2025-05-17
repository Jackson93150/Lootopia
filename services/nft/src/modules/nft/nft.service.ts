import { BadRequestException, Injectable } from "@nestjs/common"
import { ethers } from "ethers"
import { ABI } from "../../constant/abi"
import { FirebaseService } from "../../firebase/firebase.service"

@Injectable()
export class NftService {
  private provider: ethers.JsonRpcProvider
  private wallet: ethers.Wallet
  private contract: ethers.Contract

  constructor(private readonly firebaseService: FirebaseService) {
    this.provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC)
    this.wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY ?? "", this.provider)
    this.contract = new ethers.Contract(process.env.NFT_CONTRACT ?? "", ABI, this.wallet)
  }

  public async mintArtefactNFT(recipientAddress: string, tokenURI: string, userArtefactId: string) {
    try {
      const tx = await this.contract.mintNFT(recipientAddress, tokenURI)
      const receipt = await tx.wait()

      await this.firebaseService.userArtefactsCollectionRef.doc(userArtefactId).update({ is_exported_nft: true })

      return receipt
    } catch (error) {
      throw new BadRequestException(`Erreur lors du mint NFT : ${error.message}`)
    }
  }
}
