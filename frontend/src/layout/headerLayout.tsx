"use client"

import Header from "@/components/Header"
import { usePathname } from "next/navigation"

const publicRoutes = ["/", "/connexion", "/inscription"]

export default function HeaderLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const showHeader = !publicRoutes.includes(pathname)

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  )
}
