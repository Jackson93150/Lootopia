import type { ReactNode } from "react"

export default function FaqLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gradient-to-t from-[#a2cbf4] via-[#69BDF2] to-[#0150fa]">
      <div className="justify-center">{children}</div>
    </div>
  )
}
