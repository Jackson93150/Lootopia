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
    @Body() auctionInfo: {
      user_artefact_id: string
      artefact_id: string
      user_email: string
      fix_price: number | null
      auction_price: number
      direct_sale: boolean
      timer: string
      artefact_name: string
      artefact_rarity: string
      image: string
    },
  ) {
    return await this.clientSalesHotelService.createAuction(auctionInfo)
  }

  @UseGuards(AuthGuard)
  @Post("/cancel-auction")
  async cancelAuction(
    @Body() auctionInfo: {
      creator_email: string
      auction_id: string
      user_artefact_id: string
    },
  ) {
    return await this.clientSalesHotelService.cancelAuction(auctionInfo)
  }

  @UseGuards(AuthGuard)
  @Post("/directly-buy")
  async directlyBuy(
    @AuthDecorator() user: AuthenticatedUser,
    @Body() buyInfo: {
      fix_price: number
      auction_id: string
      id_user_artefact: string
      id_artefact: string
      creator_email: string
    },
  ) {
    const user_id = user.id
    return await this.clientSalesHotelService.directlyBuy(user_id, buyInfo)
  }

  @UseGuards(AuthGuard)
  @Post("/add-bid")
  async addBid(
    @AuthDecorator() user: AuthenticatedUser,
    @Body() bidInfo: {
      bid_price: number
      auction_id: string
      user_email: string
    },
  ) {
    const user_id = user.id
    return await this.clientSalesHotelService.addBid(user_id, bidInfo)
  }

  @UseGuards(AuthGuard)
  @Post("/remove-bid")
  async removeBid(
    @AuthDecorator() user: AuthenticatedUser,
    @Body() bidInfo: {
      bid_price: number
      auction_id: string
      user_email: string
    },
  ) {
    const user_id = user.id
    return await this.clientSalesHotelService.removeBid(user_id, bidInfo)
  }
}
