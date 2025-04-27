import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { firstValueFrom } from "rxjs"

@Injectable()
export class StripeService {
  constructor(@Inject("STRIPE_SERVICE") private readonly clientStripeService: ClientProxy) {}

  async createCheckoutSession(userId, crownPackageId) {
    return await this.clientStripeService.send({ cmd: 'create-checkout-session-stripe-service' }, {userId: userId, crownPackageId: crownPackageId})
  } 

  async successCheckoutSession(checkoutSessionId) {
    return await this.clientStripeService.send({ cmd: 'success-checkout-session-stripe-service' }, { checkoutSessionId })
  } 

  async getProducts() {
    return await this.clientStripeService.send({ cmd: 'get-products-stripe-service' }, {})
  } 

  async getCustomers() {
    return await this.clientStripeService.send({ cmd: 'get-customers-stripe-service' }, {})
  } 

  async getCrownPackages() {
    return await this.clientStripeService.send({ cmd: 'get-crown-packages-stripe-service' }, {})
  } 
}
