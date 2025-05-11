import { fetchBack } from "@/utils/fetch"

export async function getUserArtefact() {
  const res = await fetchBack({
    endpoint: "/reward/user-artefact",
    method: "GET",
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  const data = await res.json()

  return data
}

export async function getArtefacts() {
  const res = await fetchBack({
    endpoint: "/reward/artefacts",
    method: "GET",
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  return res.json()
}
