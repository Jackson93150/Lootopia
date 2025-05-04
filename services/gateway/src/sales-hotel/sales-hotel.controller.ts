import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from "@nestjs/common"
import { SalesHotelService } from "./sales-hotel.service"
import { AuthGuard } from "src/auth/guards/auth.guard";
import { AuthenticatedUser } from "src/auth/dto/auth.dto";
import { AuthDecorator } from "src/auth/decorators/auth.decorator";

@Controller("/sales-hotel")
export class SalesHotelController {
  constructor(private readonly clientSalesHotelService: SalesHotelService) {}

  @UseGuards(AuthGuard)
  @Post("/create-sale")
  async createSale(
    @AuthDecorator() user: AuthenticatedUser, 
    @Body() saleInfo: { artefact_id: string, crown_price: number }
  ) {
    const userId = user.id;
    return await this.clientSalesHotelService.createSale(userId, saleInfo);
  }

  @UseGuards(AuthGuard)
  @Post("/buy-sale")
  async buySale(
    @AuthDecorator() user: AuthenticatedUser, 
    @Body() saleInfo: { artefact_id: string, crown_price: number }
  ) {
    const userId = user.id;
    return await this.clientSalesHotelService.createSale(userId, saleInfo);
  }

  @Get("/get-sales")
  async getAllSales() {
    return await this.clientSalesHotelService.getAllSales();
  }
}
