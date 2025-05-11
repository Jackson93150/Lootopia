import { fetchBack } from "@/utils/fetch"

export async function createAuction(
  user_artefact_id: string,
  artefact_id: string,
  user_email: string,
  fix_price: number | null,
  auction_price: number,
  direct_sale: boolean,
  timer: string,
  artefact_name: string,
  artefact_rarity: string,
  image: string,
) {
  const res = await fetchBack({
    endpoint: "/sales-hotel/create-auction",
    method: "POST",
    body: {
      creator_email: user_email,
      user_artefact_id: user_artefact_id,
      artefact_id: artefact_id,
      fix_price: fix_price,
      auction_price: auction_price,
      direct_sale: direct_sale,
      timer: timer,
      artefact_name: artefact_name,
      artefact_rarity: artefact_rarity,
      image: image,
    },
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  return res.json()
}

export async function cancelAuction(creator_email: string, auction_id: string, user_artefact_id: string) {
  const res = await fetchBack({
    endpoint: "/sales-hotel/cancel-auction",
    method: "POST",
    body: {
      creator_email: creator_email,
      auction_id: auction_id,
      user_artefact_id: user_artefact_id,
    },
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  return res.json()
}

export async function directlyBuy(
  fix_price: number,
  auction_id: string,
  id_user_artefact: string,
  id_artefact: string,
  creator_email: string,
) {
  const res = await fetchBack({
    endpoint: "/sales-hotel/directly-buy",
    method: "POST",
    body: {
      fix_price: fix_price,
      id_user_artefact: id_user_artefact,
      id_artefact: id_artefact,
      auction_id: auction_id,
      creator_email: creator_email,
    },
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  return res.json()
}

export async function addBid(bid_price: number, auction_id: string, userMail: string) {
  const res = await fetchBack({
    endpoint: "/sales-hotel/add-bid",
    method: "POST",
    body: {
      bid_price: bid_price,
      auction_id: auction_id,
      user_email: userMail,
    },
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  return res.json()
}

export async function removeBid(bid_price: number, auction_id: string, userMail: string) {
  const res = await fetchBack({
    endpoint: "/sales-hotel/remove-bid",
    method: "POST",
    body: {
      bid_price: bid_price,
      auction_id: auction_id,
      user_email: userMail,
    },
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  return res.json()
}
