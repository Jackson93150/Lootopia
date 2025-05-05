import { fetchBack } from "@/utils/fetch"

export async function me() {
  const res = await fetchBack({
    endpoint: "/users/me",
    method: "GET",
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  return await res.json()
}

export async function getUserById(id: string) {
  const res = await fetchBack({
    endpoint: `/users/user/${id}`,
    method: "GET",
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  return await res.json()
}

export const uploadProfilePicture = async (file: File) => {
  const formData = new FormData()
  const encodedFilename = encodeURIComponent(file.name)
  formData.append("file", file, encodedFilename)

  const res = await fetchBack({
    endpoint: "/users/upload-profile-picture",
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    throw new Error(`Erreur HTTP : ${res.status}`)
  }

  return await res.json()
}
