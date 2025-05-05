import typesenseClient from "@/lib/typesense"
import axios from "axios"
import type { SearchResponseHit } from "typesense/lib/Typesense/Documents"

export async function createAuction(
  user_artefact_id: string,
  fix_price: number | null,
  auction_price: number,
  direct_sale: boolean,
  timer: string,
  artefact_name: string,
  artefact_rarity: string,
  image: string,
) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/sales-hotel/create-auction`,
    {
      user_artefact_id: user_artefact_id,
      fix_price: fix_price,
      auction_price: auction_price,
      direct_sale: direct_sale,
      timer: timer,
      artefact_name: artefact_name,
      artefact_rarity: artefact_rarity,
      image: image,
    },
    {
      withCredentials: true,
    },
  )

  return res.data
}

export async function searchAuctions(
  query: string,
  tags: string[] = [],
  tools: string[] = [],
  page = 1,
): Promise<{ auctions: any; total: number }> {
  const searchParameters: Record<string, unknown> = {
    q: query,
    query_by: "artefact_rarity",
    per_page: 9,
    page,
  }

  const filters: string[] = []

  if (tags.length) {
    filters.push(tags.map(tag => `tags:=${tag}`).join(" && "))
  }

  if (tools.length) {
    filters.push(tools.map(tool => `tools:=[${tool}]`).join(" && "))
  }

  if (filters.length) {
    searchParameters.filter_by = filters.join(" && ")
  }

  const results = await typesenseClient.collections<any>("auctions").documents().search(searchParameters)

  const hits = results.hits as SearchResponseHit<any>[]

  const auctions =
    hits?.map(hit => ({
      auction_id: hit.document.auction_id,
      creator_id: hit.document.creator_id,
      auction_price: hit.document.auction_price,
      fix_price: hit.document.fix_price,
      artefact_name: hit.document.artefact_name,
      artefact_rarity: hit.document.artefact_rarity,
      image: hit.document.image_url,
      timer: hit.document.timer,
      createdAt: hit.document.createdAt,
    })) ?? []

  return {
    auctions,
    total: results.found ?? 0,
  }
}


export async function addAuction(auction_price: string, auction_id: string) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/sales-hotel/add-auction`,
    {
      auction_price: auction_price,
      auction_id: auction_id
    },
    {
      withCredentials: true,
    },
  )

  return res.data
}