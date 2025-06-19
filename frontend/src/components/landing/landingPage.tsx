"use client"

import Image from "next/image"
import {useRouter} from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const redirectToSignup = () => router.push("/inscription");

  return (
    <div className="w-screen h-screen overflow-y-auto overflow-x-hidden">
      <div className="h-[2000px] bg-cover bg-center bg-[url('/images/backgrounds/backgroundLp.png')]">
        <div className="px-4 sm:px-10 max-w-screen-xl mx-auto">
          <div className="flex items-center flex-col">
            <Image src="/images/lootopiaLogo.png" alt="Overlay" width={280} height={100} className="top-[0px] w-70" />
            <h1 className="text-3xl sm:text-6xl text-white drop-shadow-lg font-luckiest mt-[20px] text-center">
              L'aventure
              <br />
              commence ici !
            </h1>
            <p className="text-xl sm:text-2xl text-white drop-shadow-lg font-extrabold font-fredoka mt-[20px] text-center">
              Explore les îles, découvre des trésors, et
              <br />
              deviens le roi des aventuriers !
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 mt-10">
              <div className="inline-block rounded-xl border-[1px] border-orange-dark bg-yellow-landing p-[2px] shadow-md shadow-black/30">
                <button onClick={redirectToSignup} className="h-full cursor-pointer bg-orange-button text-white px-7 py-4 rounded-lg font-fredoka font-bold text-sm hover:brightness-110 transition-all">
                  <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]">COMMENCER</span>
                </button>
              </div>
              <div className="inline-block rounded-xl border-[1px] border-orange-dark bg-yellow-landing p-[2px] shadow-md shadow-black/30">
                <button  onClick={redirectToSignup} className="bg-orange-button cursor-pointer text-white px-7 py-4 rounded-lg font-fredoka font-bold text-sm hover:brightness-110 transition-all">
                  <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]">TÉLÉCHARGER SUR APPSTORE</span>
                </button>
              </div>
            </div>

            <div className="mt-5 sm:mt-20">
              <h3 className="text-2xl sm:text-4xl text-white drop-shadow-lg font-luckiest mt-[20px] text-center">
                Comment ça marche ?
              </h3>

              <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-4 mt-10">
                {["treasuremap", "skull", "coffreouvert"].map((img, index) => (
                  <div
                    key={index}
                    className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] rounded-xl border-[1.5px] border-orange-landing bg-sand-landing-white p-[2px] shadow-xl shadow-black/30"
                  >
                    <div className="w-full h-full bg-sand-landing rounded-lg flex flex-col items-center p-4">
                      <Image
                        src={`/images/${img}.png`}
                        alt={img}
                        width={128}
                        height={128}
                        className="w-25 sm:w-32 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                      />
                      <p className="text-center text-md sm:text-xl font-semibold font-fredoka text-black text-outline-white">
                        {index === 0
                          ? "Résous des chasses au trésors"
                          : index === 1
                            ? "Résous des énigmes\net trouve des indices"
                            : "Trouve des trésors\net monte dans\nle classement"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="mt-10 sm:mt-20 text-2xl sm:text-4xl text-white drop-shadow-lg font-luckiest text-center">
                Fonctionnalités clés
              </h2>

              <div className="flex flex-row justify-center bg-sand-landing rounded-xl border-[1.5px] border-orange-landing p-6 items-center">
                <div className="flex flex-row gap-4">
                  {["iconMulti", "iconEtoile", "iconBottle", "iconPerso"].map((icon, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <Image
                        src={`/images/${icon}.png`}
                        alt={icon}
                        width={80}
                        height={80}
                        className="w-15 md:w-20 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                      />
                      <p className="text-center text-xl font-semibold font-fredoka text-black text-outline-white">
                        {icon === "iconMulti"
                          ? "Multijoueur"
                          : icon === "iconEtoile"
                            ? "Classements"
                            : icon === "iconBottle"
                              ? "Objets\nuniques"
                              : "Personnalisation"}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] hidden md:block">
                  <Image
                    src="/images/carteOtresor.png"
                    alt="Carte au trésor"
                    width={400}
                    height={300}
                    className="w-full max-w-[400px]"
                  />
                </div>
              </div>

              <div className="flex flex-row rounded-xl p-6 items-center gap-6">
                <Image
                  src="/images/pirateAsset.png"
                  alt="Capitaine pirate"
                  width={200}
                  height={200}
                  className="w-50 md:w-92"
                />
                <div className="flex flex-col">
                  <p className="text-white text-xl md:text-4xl font-fredoka italic leading-snug">
                    “Je croyais avoir tout vu...
                    <br />
                    jusqu'à ce que je découvre
                    <br />
                    l'île maudite !”
                  </p>
                  <p className="text-white text-lg font-fredoka mt-2 font-semibold">Capitaine Barbe Noire.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
