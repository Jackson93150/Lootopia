import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

@Injectable()
export class NftService {
  constructor(@Inject("NFT_SERVICE") private readonly clientNftService: ClientProxy) {}

  async mintArtefactNFT(recipientAddress: string, tokenURI: string, userArtefactId: string) {
    return await this.clientNftService.send({ cmd: "mint-nft-service" }, { recipientAddress, tokenURI, userArtefactId })
  }
}
