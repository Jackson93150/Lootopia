import { Body, Controller, Post, UseGuards } from "@nestjs/common"
import { AuthDecorator } from "src/auth/decorators/auth.decorator"
import { AuthenticatedUser } from "src/auth/dto/auth.dto"
import { AuthGuard } from "src/auth/guards/auth.guard"
import { SalesHotelService } from "./sales-hotel.service"
import { CreateAuctionDto } from "./dto/create-auction.dto"
import { CancelAuctionDto } from "./dto/cancel-auction.dto"
import { DirectlyBuy } from "./dto/directly-buy.dto"
import { Bid } from "./dto/add-bid.dto"

@Controller("/sales-hotel")
export class SalesHotelController {
  constructor(private readonly clientSalesHotelService: SalesHotelService) {}

  @UseGuards(AuthGuard)
  @Post("/create-auction")
  async createAuction(
    @Body() auctionInfo: CreateAuctionDto,
  ) {
    return await this.clientSalesHotelService.createAuction(auctionInfo)
  }

  @UseGuards(AuthGuard)
  @Post("/cancel-auction")
  async cancelAuction(
    @Body() auctionInfo: CancelAuctionDto,
  ) {
    return await this.clientSalesHotelService.cancelAuction(auctionInfo)
  }

  @UseGuards(AuthGuard)
  @Post("/directly-buy")
  async directlyBuy(
    @AuthDecorator() user: AuthenticatedUser,
    @Body() buyInfo: DirectlyBuy,
  ) {
    const user_id = user.id
    return await this.clientSalesHotelService.directlyBuy(user_id, buyInfo)
  }

  @UseGuards(AuthGuard)
  @Post("/add-bid")
  async addBid(
    @AuthDecorator() user: AuthenticatedUser,
    @Body() bidInfo: Bid,
  ) {
    const user_id = user.id
    return await this.clientSalesHotelService.addBid(user_id, bidInfo)
  }

  @UseGuards(AuthGuard)
  @Post("/remove-bid")
  async removeBid(
    @AuthDecorator() user: AuthenticatedUser,
    @Body() bidInfo: Bid,
  ) {
    const user_id = user.id
    return await this.clientSalesHotelService.removeBid(user_id, bidInfo)
  }
}
