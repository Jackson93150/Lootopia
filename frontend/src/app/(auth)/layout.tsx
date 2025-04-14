import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="flex flex-col justify-center items-center h-screen bg-cover bg-center bg-[url('/images/backgrounds/backgroundAuth.png')]">

            <img
                src="/images/coffre3.png"
                alt="coffre"
                className="fixed bottom-0 z-50 w-48 left-1/2 translate-x-[30%]"
            />
            <div
                className="relative bg-yellow-orange p-8 rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.3)] max-w-[400px] w-full border-l-[2px] border-r-[2px] border-b-[2px] border-[#FCEEA9]">
                <img
                    src="/images/lootopiaLogo.png"
                    alt="Overlay"
                    className="absolute top-[-100px] left-1/2 -translate-x-1/2 z-50"
                />
                <img
                    src="/images/Shop-Card-Gems-Title.png"
                    alt="decor"
                    className="absolute top-0 left-0 w-full scale-x-[1.02]"
                />
                <div className="mt-28">
                    {children}
                </div>
            </div>
        </div>
    );
}
