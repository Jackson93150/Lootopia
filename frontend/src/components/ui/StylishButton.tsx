import Image from "next/image"
import type React from "react"

type StylishButtonProps = {
  variant: "bag" | "chest"
  onClick?: () => void
}

const StylishButton: React.FC<StylishButtonProps> = ({ variant, onClick }) => {
  const imageSrc = variant === "bag" ? "/images/bag.png" : "/images/chest.png"

  return (
    <button onClick={onClick} className="relative bg-transparent border-none outline-none p-0 cursor-pointer">
      {/* Icône centrée */}
      <Image
        src={imageSrc}
        width={150}
        height={60}
        alt={variant}
        className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none"
      />

      {/* Panneau bois */}
      <Image src="/images/panel.png" width={400} height={80} alt="Panneau bois" className="w-full h-full" />

      <span className="font-lilita absolute inset-0 flex items-center justify-center text-yellow-100 font-bold text-3xl text-center tracking-wide drop-shadow-md pointer-events-none w-full px-6 leading-tight">
        {variant === "bag" ? (
          <>
            Participer à<br />
            une chasse
          </>
        ) : (
          <>
            Accéder à<br />
            la boutique
          </>
        )}
      </span>
    </button>
  )
}

export default StylishButton
