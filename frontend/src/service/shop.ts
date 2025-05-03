import axios from "axios"

export async function createSessionCheckout(crownPackageId: string) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/stripe/create-checkout-session`,
    { crownPackageId },
    {
      withCredentials: true,
    },
  )

  const { url } = response.data
  return url
}

export async function successSessionCheckout(sessionId: string | null) {
  return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stripe/success-checkout-session/${sessionId}`)
}

export async function getCrownsPackages() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stripe/get-crown-packages`)

  return res.data.sort((a: any, b: any) => a.price_euro - b.price_euro)
}
