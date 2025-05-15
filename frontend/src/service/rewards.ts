import { fetchBack } from "@/utils/fetch"
import { safeJson } from "@/utils/safeJson"

export async function getUserArtefact(id: string) {
  const res = await fetchBack({
    endpoint: `/reward/user-artefact/${id}`,
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

export async function getUserTrophy(id: string) {
  const res = await fetchBack({
    endpoint: `/reward/user-trophy/${id}`,
    method: "GET",
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  return await safeJson(res)
}

export async function getUserSuccess(id: string) {
  const res = await fetchBack({
    endpoint: `/reward/user-success/${id}`,
    method: "GET",
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  return await safeJson(res)
}

export async function getUserLockedSuccess(id: string) {
  const res = await fetchBack({
    endpoint: `/reward/user-locked-success/${id}`,
    method: "GET",
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  return await safeJson(res)
}
