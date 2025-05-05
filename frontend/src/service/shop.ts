import { fetchBack } from "@/utils/fetch"

export async function createSessionCheckout(crownPackageId: string) {
  const res = await fetchBack({
    endpoint: "/stripe/create-checkout-session",
    method: "POST",
    body: { crownPackageId },
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  const { url } = await res.json()
  return url
}

export async function successSessionCheckout(sessionId: string | null) {
  if (!sessionId) throw new Error("Session ID manquant")

  const res = await fetchBack({
    endpoint: `/stripe/success-checkout-session/${sessionId}`,
    method: "GET",
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  return await res.json()
}

export async function getCrownsPackages() {
  const res = await fetchBack({
    endpoint: "/stripe/get-crown-packages",
    method: "GET",
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  const data = await res.json()
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return data.sort((a: any, b: any) => a.price_euro - b.price_euro)
}
