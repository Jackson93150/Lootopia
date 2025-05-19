import clsx from "clsx"
import type { ReactNode } from "react"

interface Props {
  children: ReactNode
  color?: "orange" | "brown" | "grey" | "white"
  size?: "sm" | "md"
  stripes?: boolean
  className?: string
  innerClassName?: string
}

export default function PageContainer({
  children,
  color = "orange",
  stripes = false,
  className,
  innerClassName,
  size = "md",
}: Props) {
  const outerClass = clsx("relative w-full h-full flex justify-center outline-black", {
    "bg-orange-500": color === "orange",
    "bg-[#40160C]": color === "brown",
    "bg-[#495467]": color === "grey",
    "bg-[#8B95B3]": color === "white",
    "rounded-[28px] outline-[6px] pt-[12px]": size === "md",
    "rounded-[21px] outline-[6px] pt-[9px]": size === "sm",
  })

  const innerClass = clsx("relative flex overflow-hidden", {
    "bg-gradient-to-r from-[#F38424] to-[#F7C929] outline-[#F2E30B]": color === "orange",
    "bg-gradient-to-r from-[#592A19] to-[#8C5642] outline-[#260801]": color === "brown",
    "bg-gradient-to-r from-[#495467] to-[#616881] outline-[#8B95B3]": color === "grey",
    "bg-gradient-to-r from-[#55748E] to-[#C0D3E2] outline-[#D9E7F2]": color === "white",
    "w-[calc(100%-24px)] h-[calc(100%-28px)] rounded-[16px] outline-[12px] p-[12px]": size === "md",
    "w-[calc(100%-16px)] h-[calc(100%-21px)] rounded-[12px] outline-[9px] p-[9px]": size === "sm",
  })

  return (
    <div className={clsx(outerClass, className)}>
      <div className={clsx(innerClass, innerClassName)}>{children}</div>
      {stripes && (
        <div className="absolute top-0 right-[5%] h-full w-[8%] flex justify-between">
          <span className="h-full w-[40%] bg-white/20" />
          <span className="h-full w-[40%] bg-white/20" />
        </div>
      )}
    </div>
  )
}
