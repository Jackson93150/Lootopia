import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center bg-[url('/images/backgrounds/backgroundAuth.png')] overflow-hidden">
      <img src="/images/coffre3.png" alt="coffre" className="fixed bottom-0 z-50 w-48 left-1/2 translate-x-[30%]" />
      <div className="relative max-w-[400px] w-full bg-[url('/images/Shop-Card-Gems-Title.png')] bg-no-repeat bg-contain bg-center pb-8">
        <img
          src="/images/lootopiaLogo.png"
          alt="Overlay"
          className="fixed top-[0px] left-1/2 -translate-x-1/2 z-50 w-60"
        />
        <div className="mt-28 p-8">{children}</div>
      </div>
    </div>
  )
}
