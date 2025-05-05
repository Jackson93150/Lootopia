import { Body, Controller, Post, UseGuards } from "@nestjs/common"
import { AuthDecorator } from "src/auth/decorators/auth.decorator"
import { AuthenticatedUser } from "src/auth/dto/auth.dto"
import { AuthGuard } from "src/auth/guards/auth.guard"
import { SalesHotelService } from "./sales-hotel.service"

@Controller("/sales-hotel")
export class SalesHotelController {
  constructor(private readonly clientSalesHotelService: SalesHotelService) {}

  @UseGuards(AuthGuard)
  @Post("/create-auction")
  async createAuction(
    @AuthDecorator() user: AuthenticatedUser,
    @Body() auctionInfo: {
      user_artefact_id: string
      fix_price: number | null
      auction_price: number
      direct_sale: boolean
      timer: string
      artefact_name: string
      artefact_rarity: string
      image: string
    },
  ) {
    const userId = user.id
    return await this.clientSalesHotelService.createAuction(userId, auctionInfo)
  }

  @UseGuards(AuthGuard)
  @Post("/add-auction")
  async addAuction(
    @AuthDecorator() user: AuthenticatedUser,
    @Body() auctionInfo: {
      user_artefact_id: string
      auction_price: number
      auction_id: string
    },
  ) {
    const userId = user.id
    return await this.clientSalesHotelService.addAuction(userId, auctionInfo)
  }
}
