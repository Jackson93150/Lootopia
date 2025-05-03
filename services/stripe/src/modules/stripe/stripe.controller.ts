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

  @MessagePattern({ cmd: "webhook-stripe-service" })
  async webhook(@Body() signatureAndPayload) {
    const payload = Buffer.from(signatureAndPayload.payload.data)
    return await this.stripeService.webhook(signatureAndPayload.signature, payload)
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
