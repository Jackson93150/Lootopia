import { fetchBack } from "@/utils/fetch"

export async function mintNft(recipientAddress: string, tokenURI: string, userArtefactId: string) {
  const res = await fetchBack({
    endpoint: "/nft/mint",
    method: "POST",
    body: { recipientAddress, tokenURI, userArtefactId },
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  const data = await res.json()

  return data
}
