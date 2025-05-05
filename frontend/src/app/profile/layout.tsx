import type { ReactNode } from "react"

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-cover bg-black bg-center bg-[url('/images/backgrounds/profile-bg.png')]">
      <div className="p-8">{children}</div>
    </div>
  )
}
