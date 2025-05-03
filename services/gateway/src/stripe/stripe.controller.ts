import { Body, Controller, Get, Post, UseGuards, Param, Res, Headers, Req, RawBodyRequest } from "@nestjs/common"
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

  @Post('/webhook')
  async webhook(@Headers('stripe-signature') signature: string, @Req() req: RawBodyRequest<Request>) {
    const payload = req.rawBody;
    return await this.clientStripeService.webhook(signature, payload)
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
