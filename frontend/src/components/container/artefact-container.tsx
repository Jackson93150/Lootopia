import clsx from "clsx"
import Image from "next/image"
import type { ReactNode } from "react"

interface Props {
  children: ReactNode
  rarity: string
  size?: "sm" | "md"
  name: string
  description: string
  stripes?: boolean
  className?: string
  innerClassName?: string
}

const rarityImageMap: Partial<Record<string, string>> = {
  Commun: "/images/title-commun.svg",
  Rare: "/images/title-rare.svg",
  Épique: "/images/title-epic.svg",
  Légendaire: "/images/title-legendaire.svg",
}

export default function ArtefactContainer({
  children,
  rarity,
  name,
  description,
  stripes = false,
  className,
  innerClassName,
  size = "md",
}: Props) {
  const outerClass = clsx("relative w-full h-full flex justify-center outline-black overflow-hidden", {
    "bg-orange-500": rarity === "Légendaire",
    "bg-[#4F0D84]": rarity === "Rare",
    "bg-[#5D0849]": rarity === "Épique",
    "bg-[#495467]": rarity === "Commun",
    "rounded-[28px] outline-[6px] pt-[12px]": size === "md",
    "rounded-[21px] outline-[6px] pt-[9px]": size === "sm",
  })

  const innerClass = clsx("relative flex overflow-hidden", {
    "bg-gradient-to-r from-[#F38424] to-[#F7C929] outline-[#F2E30B]": rarity === "Légendaire",
    "bg-gradient-to-r from-[#3F1E59] to-[#6C3499] outline-[#AE7BD7]": rarity === "Rare",
    "bg-gradient-to-r from-[#450B37] to-[#B52093] outline-[#833C73]": rarity === "Épique",
    "bg-gradient-to-r from-[#516074] to-[#BCCFDF] outline-[#8B95B3]": rarity === "Commun",
    "w-[calc(100%-24px)] h-[calc(100%-28px)] rounded-[16px] outline-[12px] p-[12px]": size === "md",
    "w-[calc(100%-16px)] h-[calc(100%-21px)] rounded-[12px] outline-[9px] p-[9px]": size === "sm",
  })

  const rarityImage = rarityImageMap[rarity]

  return (
    <div className={clsx(outerClass, className)}>
      <Image
        src={rarityImage ?? ""}
        width={300}
        height={300}
        alt="title"
        className="absolute top-[-4px] z-30 w-[75%]"
        unoptimized
      />

      <div className="absolute top-[5px] right-[5px] z-40 w-[25px] group cursor-pointer">
        <Image src="/images/info.svg" width={25} height={25} alt="info" className="w-[25px] h-[25px]" unoptimized />
        <div
          className="
      absolute top-full left-[-80px] mt-2 -translate-x-1/2
      px-3 py-2 text-sm text-white bg-black bg-opacity-80 rounded-lg shadow-lg
      opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
      transition-all duration-200 pointer-events-none z-40
      whitespace-normal w-max max-w-[200px]
    "
        >
          {description}
        </div>
      </div>

      <span className="absolute top-[4px] z-30 w-full justify-center flex font-lilita text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        {name}
      </span>
      <div className={clsx(innerClass, innerClassName, "relative shine-effect shine-effect-hover")}>{children}</div>
      {stripes && (
        <div className="absolute top-0 right-[5%] h-full w-[8%] flex justify-between">
          <span className="h-full w-[40%] bg-white/20" />
          <span className="h-full w-[40%] bg-white/20" />
        </div>
      )}
    </div>
  )
}
