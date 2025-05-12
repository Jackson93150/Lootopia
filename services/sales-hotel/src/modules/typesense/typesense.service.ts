import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import Typesense, { type Client } from "typesense"

@Injectable()
export class TypesenseService {
  public client: Client

  constructor(private configService: ConfigService) {
    this.client = new Typesense.Client({
      nodes: [
        {
          host: this.configService.getOrThrow<string>("TYPESENSE_HOST"),
          port: this.configService.get<number>("TYPESENSE_PORT") ?? 443,
          protocol: this.configService.get<string>("TYPESENSE_PROTOCOL") ?? "https",
        },
      ],
      apiKey: this.configService.getOrThrow<string>("TYPESENSE_API_KEY"),
      connectionTimeoutSeconds: 2,
    })
  }

  async searchOneAuctionDocumentByAuctionId(auction_id) {
    const searchResult = await this.client
      .collections("auctions")
      .documents()
      .search({
        q: "*",
        query_by: "auction_id",
        filter_by: `auction_id:=${auction_id}`,
      })

    const existingDoc = searchResult.hits?.[0]?.document

    if (!existingDoc) {
      throw new Error("Document non trouvé avec cet auction_id.")
    }

    return existingDoc
  }

  async updateOneAuctionDocument(updatedDoc) {
    await this.client.collections("auctions").documents().upsert(updatedDoc)
  }

  async addOneBidUserDocument(newDoc) {
    await this.client.collections("bid_user").documents().upsert(newDoc)
  }
}
