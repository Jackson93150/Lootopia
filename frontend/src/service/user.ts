import axios from "axios"

export async function me() {
  return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
    withCredentials: true,
  })
}

export async function getUserById(id: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/user/${id}`, {
    withCredentials: true,
  })

  return res.data
}
