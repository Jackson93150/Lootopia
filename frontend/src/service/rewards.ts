import axios from "axios"

export async function getUserArtefact() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reward/user-artefact`, {
    withCredentials: true,
  })

  return res.data
}
