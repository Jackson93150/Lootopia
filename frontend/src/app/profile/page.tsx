import Image from "next/image"
import "../globals.css"

export default function ProfilePage() {
  return (
    <div className="w-screen h-screen items-center justify-center flex">
      <div className="w-screen h-screen flex border pt-30 px-15 pb-10">
        <Image src="/profile-container.png" alt="container" fill className="absolute pt-30 px-15 pb-10" />
        <div className="w-full flex h-full p-14 gap-8 z-10">
          <div className="h-full w-[250px] bg-[#A96A3D] outline-[#5B3E29] outline-[8px] rounded-[8px] p-4 flex flex-col">
            <div className="w-full h-[40%] bg-[#FAC27D] rounded-[8px] border p-2">
              <div className="w-full h-full rounded-[8px] border overflow-hidden">
                <Image
                  src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"
                  alt="profile"
                  width={500}
                  height={500}
                  className="size-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="h-full grow flex flex-col">
            <div className="h-[15%] ml-4 items-end gap-1 flex w-fit">
              <div className="h-[40px] px-4 py-1 bg-gradient-to-b from-[#E9721E] to-[#F29D25] rounded-[8px] outline-[2px] border-[2px] border-[#F65F26]/70">
                <span className="stroke-1 font-lilita text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  Artefacts
                </span>
              </div>

              <div className="h-[40px] px-4 py-1 bg-gradient-to-b from-[#E9721E] to-[#F29D25] rounded-[8px] outline-[2px] border-[2px] border-[#F65F26]/70">
                <span className="stroke-1 font-lilita text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  Trophées
                </span>
              </div>

              <div className="h-[40px] px-4 py-1 bg-gradient-to-b from-[#E9721E] to-[#F29D25] rounded-[8px] outline-[2px] border-[2px] border-[#F65F26]/70">
                <span className="stroke-1 font-lilita text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  Succès
                </span>
              </div>
            </div>
            <div className="z-10 h-[85%] grow bg-[#A96A3D] outline-[#5B3E29] outline-[8px] rounded-[8px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
