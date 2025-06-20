import type { ReactNode } from "react"

export default function HuntingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gradient-to-t from-[#a2cbf4] via-[#69BDF2] to-[#0150fa]">
      <div>{children}</div>
    </div>
  )
}
