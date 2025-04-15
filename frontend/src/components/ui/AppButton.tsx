import clsx from "clsx"
import type { ReactNode } from "react"

type ButtonProps = {
  variant?: "primary" | "social"
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

const baseClasses = "w-full font-semibold rounded-xl h-10 transition-colors text-sm"

const variants = {
  primary: "bg-sand-light !text-black border-4 border-beige",
  social: "bg-sand-light text-blue-500 border-4 border-beige",
}

const Button = ({
  variant = "primary",
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseClasses, variants[variant], className)}
    >
      {children}
    </button>
  )
}

export default Button
