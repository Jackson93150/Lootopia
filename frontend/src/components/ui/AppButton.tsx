import clsx from "clsx"
import type { ReactNode } from "react"

type ButtonProps = {
  variant?: "primary" | "social"
  children: ReactNode
  icon?: ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

const baseClasses =
  "w-full flex items-center justify-center gap-2 font-semibold cursor-pointer rounded-xl h-10 z-10 text-sm"

const variants = {
  primary: "bg-sand-light !text-black border-4 border-beige",
  social: "bg-sand-light text-blue-500 border-4 border-beige",
}

const Button = ({
  variant = "primary",
  children,
  className = "",
  icon,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  return (
    <div className="flex relative w-fit pb-1">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={clsx(baseClasses, variants[variant], className)}
      >
        {icon !== undefined && <div className="">{icon}</div>}
        {children}
      </button>
      <span className="absolute bottom-0 w-full rounded-xl h-10 bg-[#280F0C]" />
    </div>
  )
}

export default Button
