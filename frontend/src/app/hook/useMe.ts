"use client"

import { fetchBack } from "@/utils/fetch"
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
        const res = await fetchBack({
          endpoint: "/users/me",
          method: "GET",
        })

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }

        const data = await res.json()
        setUser(data.user)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, loading, error }
}
