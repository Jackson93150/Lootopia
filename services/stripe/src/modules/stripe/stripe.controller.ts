import { Body, Controller } from "@nestjs/common"
import { MessagePattern } from "@nestjs/microservices"
import { StripeService } from "./stripe.service"

@Controller()
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @MessagePattern({ cmd: "create-checkout-session-stripe-service" })
  async createCheckoutSession(@Body() userIdAndCrownPackageId) {
    return await this.stripeService.createCheckoutSession(
      userIdAndCrownPackageId.userId,
      userIdAndCrownPackageId.crownPackageId,
    )
  }

  @MessagePattern({ cmd: "success-checkout-session-stripe-service" })
  async successCheckoutSession(@Body() checkoutSessionId) {
    return await this.stripeService.successCheckoutSession(checkoutSessionId)
  }

  @MessagePattern({ cmd: "get-products-stripe-service" })
  async getProducts() {
    return await this.stripeService.getProducts()
  }

  @MessagePattern({ cmd: "get-customers-stripe-service" })
  async getCustomers() {
    return await this.stripeService.getCustomers()
  }
}
