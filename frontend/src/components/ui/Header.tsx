"use client"

import { RankDisplay } from "@/components/ui/RankDisplay"
import { useUser } from "@/context/userContext"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Header() {
  const { user, loading } = useUser()
  const router = useRouter()
  return (
    <header
      className="fixed w-full bg-cover top-0 left-0 z-50 h-[90px] bg-center bg-[url('/images/backgrounds/backgroundHeader.png')]"
      style={{ backgroundSize: "110% 100%" }}
    >
      <div className="flex items-center h-[90px] justify-between px-12">
        <div className="flex items-center gap-6">
          <Image
            src="/images/lootopiaLogo.png"
            alt="Logo Lootopia"
            width={140}
            height={70}
            className="h-auto -mb-14 w-[100px] md:w-[140px]"
          />

          <nav className="flex items-center gap-8">
            <button
              onClick={() => router.push("/app/hotel")}
              className="uppercase text-xl md:text-2xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer tracking-wider font-extrabold font-lilita hover:scale-105 transition"
            >
              hôtel
            </button>
            <button
              onClick={() => router.push("/app/chasse")}
              className="uppercase text-xl md:text-2xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer tracking-wider font-extrabold font-lilita hover:scale-105 transition"
            >
              chasse
            </button>
            <button
              onClick={() => router.push("/app/leaderboard")}
              className="uppercase text-xl md:text-2xl text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] cursor-pointer tracking-wider font-extrabold font-lilita hover:scale-105 transition"
            >
              leaderboard
            </button>
          </nav>
        </div>

        {!loading && (
          <div className="flex items-center gap-8">
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div onClick={() => router.push("/app/profile")} className="scale-[0.75] origin-right cursor-pointer">
              <RankDisplay user={user} />
            </div>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
              onClick={() => router.push("/app/boutique")}
              className="cursor-pointer relative p-1 pl-6 pr-2 ml-4 flex gap-2 justify-center items-center bg-gradient-to-b from-[#6998B3] to-[#547585] rounded-[8px] outline-[2px]"
            >
              <Image
                src={"/images/couronnes.png"}
                width={200}
                height={200}
                alt="courrone"
                className="absolute size-[60px] left-0 -translate-x-1/2"
              />
              <Image
                src={"/images/plus.svg"}
                width={200}
                height={200}
                alt="plus"
                className="absolute size-[20px] right-0 bottom-[5px] translate-x-1/2 translate-y-1/2"
                unoptimized
              />
              <span className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-lilita">{user?.solde}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
