import type { ReactNode } from "react"
import { ToastContainer } from "react-toastify"

export default function HotelLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gradient-to-t from-[#a2cbf4] via-[#69BDF2] to-[#0150fa]">
      <div className="justify-center">{children}</div>
      <ToastContainer position="bottom-right" theme="colored" limit={5} stacked />
    </div>
  )
}
