"use client";

import Image from "next/image";

export default function Header() {
    return (
        <header
            className="fixed w-full bg-cover top-0 left-0 z-50 h-[90px] bg-center bg-[url('/images/backgrounds/Group.png')]"
            style={{backgroundSize: "100% 100%"}}
        >
            <div className="flex items-center justify-between px-6 ">
                {/* Gauche : Logo + navigation */}
                <div className="flex items-center gap-6">
                    <Image
                        src="/images/lootopiaLogo.png"
                        alt="Logo Lootopia"
                        width={100}
                        height={40}
                        className="h-auto"
                    />

                    {/* Navigation */}
                    <nav className="flex items-center gap-4">
                        <button
                            className="text-2xl text-white drop-shadow-lg tracking-wider font-extrabold font-lilita hover:underline transition">
                            BOUTIQUE
                        </button>
                        <button
                            className="text-2xl text-white drop-shadow-lg tracking-wider font-extrabold font-lilita hover:underline transition">
                            INVENTAIRE
                        </button>
                        <button
                            className="text-2xl text-white drop-shadow-lg tracking-wider font-extrabold font-lilita hover:underline transition">
                            CHASSE
                        </button>
                    </nav>
                </div>

                {/* Droite : Profil */}
                <p className="text-black font-fredoka font-medium">Profil</p>
            </div>
        </header>

    );
}
