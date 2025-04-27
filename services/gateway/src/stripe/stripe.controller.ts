import { Body, Controller, Get, Post, UseGuards, Param, Res } from "@nestjs/common"
import { Response } from 'express';

import { AuthDecorator } from "../auth/decorators/auth.decorator"
import { AuthenticatedUser } from "../auth/dto/auth.dto"
import { AuthGuard } from "../auth/guards/auth.guard"
import { StripeService } from "./stripe.service"

@Controller("/stripe")
export class StripeController {
  constructor(private readonly clientStripeService: StripeService) {}

  @UseGuards(AuthGuard)
  @Post("create-checkout-session")
  async createCheckoutSession(@AuthDecorator() user: AuthenticatedUser, @Body('crownPackageId') crownPackageId: string) {
      return await this.clientStripeService.createCheckoutSession(user.id, crownPackageId)
  }

  @Get("success-checkout-session/:session_id")
  async successCheckoutSession(@Param('session_id') session_id: string, @Res() res: Response) {
    return await this.clientStripeService.successCheckoutSession(session_id)
  }

  @Get("get-products")
  async getProducts() {
      return await this.clientStripeService.getProducts()
  }

  @Get("get-customers")
  async getCustomers() {
      return await this.clientStripeService.getCustomers()
  }

  @Get("get-crown-packages")
  async getCrownPackages() {
      return await this.clientStripeService.getCrownPackages()
  }
}
