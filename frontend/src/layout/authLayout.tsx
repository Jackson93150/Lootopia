"use client"

import { useUser } from "@/context/userContext"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading } = useUser()

  const publicRoutes = ["/", "/connexion", "/inscription"]

  useEffect(() => {
    if (!loading && !user && !publicRoutes.includes(pathname)) {
      router.replace("/connexion")
    }
  }, [loading, user, pathname, router])

  if (loading) return <div>Chargement...</div>
  if (!user && !publicRoutes.includes(pathname)) return null

  return <>{children}</>
}
