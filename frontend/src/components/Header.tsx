"use client";

import Image from "next/image";

export default function Header() {
    return (
        <header
            className="w-full h-[100px] bg-cover bg-center bg-[url('/images/backgrounds/backgroundHeader.png')]"
            style={{backgroundSize: "100% 390%"}}
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
                            className="text-xl text-white drop-shadow-lg font-extrabold font-fredoka hover:underline transition">
                            BOUTIQUE
                        </button>
                        <button
                            className="text-xl text-white drop-shadow-lg font-extrabold font-fredoka hover:underline transition">
                            INVENTAIRE
                        </button>
                        <button
                            className="text-xl text-white drop-shadow-lg font-extrabold font-fredoka hover:underline transition">
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
