"use client";

import Image from "next/image";
import {RankDisplay} from "@/components/ui/RankDisplay";
import { useMe } from "@/app/hook/useMe";
import { useRouter } from "next/navigation"

export default function Header() {
    const { user, loading } = useMe()
    const router = useRouter()
    return (
        <header
            className="fixed w-full bg-cover top-0 left-0 z-50 h-[90px] bg-center bg-[url('/images/backgrounds/Group.png')]"
            style={{backgroundSize: "100% 100%"}}
        >
            <div className="flex items-center h-[90px] justify-between px-6 ">
                <div className="flex items-center gap-6">
                    <Image
                        src="/images/lootopiaLogo.png"
                        alt="Logo Lootopia"
                        width={140}
                        height={70}
                        className="h-auto -mb-14 w-[100px] md:w-[140px]"
                    />

                    <nav className="flex items-center gap-4">
                        <button
                            onClick={() => router.push("/hotel-de-vente")}
                            className="text-xl md:text-2xl text-white drop-shadow-lg tracking-wider font-extrabold font-lilita hover:scale-105 transition">
                            BOUTIQUE
                        </button>
                        <button
                            onClick={() => router.push("/profile")}
                            className="text-xl md:text-2xl text-white drop-shadow-lg tracking-wider font-extrabold font-lilita hover:scale-105 transition">
                            INVENTAIRE
                        </button>
                        <button
                            className="text-xl md:text-2xl text-white drop-shadow-lg tracking-wider font-extrabold font-lilita hover:scale-105 transition">
                            CHASSE
                        </button>
                    </nav>
                </div>

                {!loading && (
                <div onClick={() => router.push("/profile")}
                     className="scale-[0.75] origin-right cursor-pointer">
                    <RankDisplay user={user} />
                </div>
                    )}
            </div>
        </header>

    );
}
