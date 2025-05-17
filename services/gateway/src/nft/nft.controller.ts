import { Body, Controller, Post, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/auth/guards/auth.guard"
import { NftService } from "./nft.service"

@Controller("/nft")
export class NftController {
  constructor(private readonly clientNftService: NftService) {}

  @Post("mint")
  @UseGuards(AuthGuard)
  async mintNft(@Body() body: { recipientAddress: string; tokenURI: string; userArtefactId: string }) {
    return await this.clientNftService.mintArtefactNFT(body.recipientAddress, body.tokenURI, body.userArtefactId)
  }
}
