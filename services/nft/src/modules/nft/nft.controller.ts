import { Controller } from "@nestjs/common"

import { MessagePattern } from "@nestjs/microservices"
import { NftService } from "./nft.service"

@Controller()
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @MessagePattern({ cmd: "mint-nft-service" })
  async mintNft(data: { recipientAddress: string; tokenURI: string; userArtefactId: string }) {
    return await this.nftService.mintArtefactNFT(data.recipientAddress, data.tokenURI, data.userArtefactId)
  }
}
