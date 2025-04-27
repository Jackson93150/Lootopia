import axios from "axios"

export async function createSessionCheckout(crownPackageId: string) {
  console.log(crownPackageId)

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
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stripe/success-checkout-session/${sessionId}`)

  return res
}

export async function getCrownsPackages() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stripe/get-crown-packages`)

  const sortedCrownPackages = res.data.sort((a: any, b: any) => a.price_euro - b.price_euro)
  return sortedCrownPackages
}
