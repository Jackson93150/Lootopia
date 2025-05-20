import type { ReactNode } from "react"
import { ToastContainer } from "react-toastify"

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-cover bg-black bg-center bg-[url('/images/backgrounds/profile-bg.png')]">
      <div>{children}</div>
      <ToastContainer position="bottom-right" theme="colored" limit={5} stacked />
    </div>
  )
}
