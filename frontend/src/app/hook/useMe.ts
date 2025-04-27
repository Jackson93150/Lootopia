"use client"

import axios from "axios"
import { useEffect, useState } from "react"

export function useMe() {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
          withCredentials: true,
        })
        setUser(res.data.user)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, loading, error }
}
