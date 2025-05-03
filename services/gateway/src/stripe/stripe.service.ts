import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { firstValueFrom } from "rxjs"

@Injectable()
export class StripeService {
  constructor(@Inject("STRIPE_SERVICE") private readonly clientStripeService: ClientProxy) {}

  async createCheckoutSession(userId, crownPackageId) {
    return await this.clientStripeService.send({ cmd: 'create-checkout-session-stripe-service' }, {userId: userId, crownPackageId: crownPackageId})
  } 

  async webhook(signature, payload) {
    return await this.clientStripeService.send({ cmd: 'webhook-stripe-service' }, { signature: signature, payload: payload })
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
