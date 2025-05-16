import Image from "next/image"
import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center bg-[url('/images/backgrounds/backgroundAuth.png')] overflow-hidden">
      <div className="relative max-w-[400px] w-full bg-[url('/images/Shop-Card-Gems-Title.png')] bg-no-repeat bg-contain bg-center pb-8">
        <div className="relative flex mt-28 p-8">
          <Image
            src="/images/lootopiaLogo.png"
            alt="Overlay"
            width={300}
            height={300}
            className="absolute -top-1/2 left-1/2 -translate-x-1/2 z-50 w-60"
          />
          <Image
            src="/images/coffre3.png"
            alt="coffre"
            width={300}
            height={300}
            className="absolute bottom-0 z-50 w-48 left-1/2 translate-[50%]"
          />
          {children}
        </div>
      </div>
    </div>
  )
}
