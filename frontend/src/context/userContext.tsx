"use client"

import type { User } from "@/app/types/user"
import { fetchBack } from "@/utils/fetch"
import { createContext, useContext, useEffect, useState } from "react"

type UserContextType = {
  user: User | null
  id: string | null
  loading: boolean
  error: Error | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [id, setId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

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

  return <UserContext.Provider value={{ user, id, loading, error }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
