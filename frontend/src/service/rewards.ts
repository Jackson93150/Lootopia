import { fetchBack } from "@/utils/fetch"
import { safeJson } from "@/utils/safeJson"

type ArtefactFilters = {
  auction?: boolean
  is_saled?: boolean
  is_exported_nft?: boolean
}

export async function getUserArtefact(id: string, filters: ArtefactFilters = {}) {
  const { auction = false, is_saled = false, is_exported_nft = false } = filters

  const searchParams = new URLSearchParams({
    auction: String(auction),
    is_saled: String(is_saled),
    is_exported_nft: String(is_exported_nft),
  })

  const res = await fetchBack({
    endpoint: `/reward/user-artefact/${id}?${searchParams.toString()}`,
    method: "GET",
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  return await res.json()
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

export async function getUsersXp() {
  const res = await fetchBack({
    endpoint: "/reward/users-xp",
    method: "GET",
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  return await safeJson(res)
}
