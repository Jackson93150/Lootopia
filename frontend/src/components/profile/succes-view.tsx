import type { Success, UserSuccess } from "@/app/types/success"
import Image from "next/image"

interface Props {
  lockedSuccess: Success[] | null
  userSuccess: UserSuccess[] | null
}

export default function SuccessView({ lockedSuccess, userSuccess }: Props) {
  const getRarityImage = (rarity: string): string => {
    switch (rarity.toLowerCase()) {
      case "bronze":
        return "/images/one-star.png"
      case "silver":
        return "/images/two-star.png"
      case "gold":
        return "/images/three-star.png"
      default:
        return "/images/one-star.png"
    }
  }
  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex-grow h-[4px] bg-white/70" />
          <h2 className="text-white font-lilita text-[32px] whitespace-nowrap drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Mes Succès
          </h2>
          <div className="flex-grow h-[4px] bg-white/70" />
        </div>

        {userSuccess && userSuccess.length > 0 ? (
          <div className="flex flex-col gap-3">
            {userSuccess.map(success => (
              <div
                key={success.success_id}
                className="bg-[#eef4fa] rounded-[16px] border-[2px] border-[#333333] px-6 py-4 text-black flex items-center justify-between"
              >
                <span className="font-semibold text-lg">{success.success.name}</span>
                <Image
                  src={getRarityImage(success.success.rarity)}
                  alt={success.success.rarity}
                  width={80}
                  height={16}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white font-lilita">Aucun succès débloqué.</p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex-grow h-[4px] bg-white/70" />
          <h2 className="text-white font-lilita text-[32px] whitespace-nowrap drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            À Débloquer
          </h2>
          <div className="flex-grow h-[4px] bg-white/70" />
        </div>

        {lockedSuccess && lockedSuccess.length > 0 ? (
          <div className="flex flex-col gap-3">
            {lockedSuccess.map(success => (
              <div
                key={success.id_firebase}
                className="bg-[#eef4fa] rounded-[16px] border-[2px] border-[#333333] px-6 py-4 text-black flex items-center justify-between opacity-60"
              >
                <span className="font-semibold text-lg">{success.name}</span>
                <Image src={getRarityImage(success.rarity)} alt={success.rarity} width={80} height={16} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white font-lilita">Tous les succès ont été débloqués</p>
        )}
      </div>
    </div>
  )
}
