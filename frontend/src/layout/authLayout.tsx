"use client"

import { useUser } from "@/context/userContext"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading } = useUser()

  const publicRoutes = ["/", "/connexion", "/inscription"]

  useEffect(() => {
    if (!loading && !user && !publicRoutes.includes(pathname)) {
      router.replace("/connexion")
    }
  }, [loading, user, pathname, router])

  if (loading)
    return (
      <div className="bg-gradient-to-t from-[#a2cbf4] via-[#69BDF2] to-[#0150fa] fixed h-screen w-screen flex items-center justify-center">
        <div className="w-[30vw] rounded-full flex flex-col bg-gradient-to-r from-[#F38424] to-[#F7C929] border-[4px] items-center justify-center pt-4">
          <span className="font-lilita text-[42px] text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] animate-bounce">
            Loading ...
          </span>
          <DotLottieReact
            src="https://lottie.host/34a0cfac-e0fc-428d-a34c-16e1f65e5977/9l7sKj6g8L.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    )
  if (!user && !publicRoutes.includes(pathname)) return null

  return <>{children}</>
}
