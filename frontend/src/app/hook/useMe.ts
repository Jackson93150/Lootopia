"use client"

import { fetchBack } from "@/utils/fetch"
import { useEffect, useState } from "react"
import type { User } from "../types/user"

export function useMe() {
  const [user, setUser] = useState<User | null>(null)
  const [id, setId] = useState<string | null>(null)
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
        setId(data.id)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, id, loading, error }
}
