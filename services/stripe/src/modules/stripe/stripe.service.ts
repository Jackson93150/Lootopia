import { BadRequestException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common"
import { FirebaseService } from "src/firebase/firebase.service"
import Stripe from "stripe"
import { CrownService } from "../crown/crown.service"
import { StripeTransactionConverter } from "./types/stripe-transaction"
import { ClientProxy } from "@nestjs/microservices"

@Injectable()
export class StripeService {
  private stripe: Stripe
  private event: Stripe.Event

  constructor(
    @Inject("STRIPE_API_KEY") private readonly apiKey: string,
    @Inject("USER_SERVICE") private readonly clientUserService: ClientProxy,
    private readonly crownPackageService: CrownService,
    private readonly firebaseService: FirebaseService,
  ) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: "2025-03-31.basil",
    })
  }

  async getProducts(): Promise<Stripe.Product[]> {
    const products = await this.stripe.products.list()
    return products.data
  }

  async getCustomers() {
    const customers = await this.stripe.customers.list()
    return customers.data
  }

  async createCheckoutSession(userId, crownPackageId) {
    try {
      const crownPackage = await this.crownPackageService.getCrownPackageById(crownPackageId)

      const params: Stripe.Checkout.SessionCreateParams = {
        line_items: [
          {
            price_data: {
              currency: "EUR",
              unit_amount: crownPackage.price_euro * 100,
              product_data: {
                name: `${crownPackage.crown_amount} COURONNES`,
              },
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/boutique`,
        cancel_url: `${process.env.FRONTEND_URL}/boutique`,
        metadata: {
          productId: `${crownPackage.id_firebase}`,
          userId: `${userId}`,
          amountCrown: `${crownPackage.amountCrown}`
        },
      }

      const session = await this.stripe.checkout.sessions.create(params)

      await this.firebaseService.stripeTransactionsCollectionRef
        .withConverter(StripeTransactionConverter)
        .add({
          id_user: userId,
          txh: session.id,
          id_crown_package: crownPackage.id_firebase,
          statut: "En cours",
          montant_couronnes: crownPackage.crown_amount,
        })

      return session
    } catch (error) {
      console.error("Error creating session:", error)
      throw new InternalServerErrorException(
        "Failed to create checkout session", 
      )
    }
  }

  private async getCheckoutSessionByThx(id: string) {
    try {
      const snapshot = await this.firebaseService.stripeTransactionsCollectionRef
        .where("txh", "==", id)
        .where("statut", "==", "En cours")
        .limit(1)
        .get()

      if (snapshot.empty) {
        throw new Error(`Aucune transaction trouvée avec le txh : ${id}`)
      }

      const doc = snapshot.docs[0]
      return { id: doc.id, ...doc.data() }
    } catch (err) {
      console.error("Erreur lors de la récupération de la transaction :", err)
      throw new InternalServerErrorException("Impossible de récupérer la transaction Stripe.")
    }
  }

  async webhook(signature, payload) {
    try {
      this.event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        String(process.env.STRIPE_WEBHOOK_KEY),
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    if (this.event.type === 'checkout.session.completed') {
      const sessionId = this.event.data.object.id

      await this.successCheckoutSession(sessionId)
    }
  }

  private async successCheckoutSession(checkoutSessionId) {
    const checkoutSession = await this.getCheckoutSessionByThx(checkoutSessionId)

    await this.firebaseService.stripeTransactionsCollectionRef
      .doc(checkoutSession.id)
      .update({
        statut: "Payée",
      });

    await this.clientUserService.emit({ cmd: 'add-crown-user-service' }, { userId: checkoutSession.id_user, amountOfCrown: checkoutSession.montant_couronnes })

    return { statut: 'success' }
  }
}
