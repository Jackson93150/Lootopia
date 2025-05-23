import type { UserWithId } from "@/app/types/user"
import clsx from "clsx"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { RANKS } from "../ui/RankDisplay"

interface Props {
  user: UserWithId
  index: number
}

export default function Cell({ user, index }: Props) {
  const router = useRouter()
  const xp = Number.parseInt(user?.xp ?? "") ?? 0
  const rank = RANKS.find(r => xp >= r.xp_min && xp < r.xp_max) || RANKS[RANKS.length - 1]

  const innerClass = clsx(
    "pl-4 py-2 w-full grid grid-cols-4 items-center justify-between p-1 rounded-[8px] outline-[4px] cursor-pointer",
    {
      "bg-gradient-to-br from-[#F38424] to-[#F7C929] outline-[#F2E30B]": index === 0,
      "bg-gradient-to-br from-[#55748E] to-[#C0D3E2] outline-[#D9E7F2]": index === 1,
      "bg-gradient-to-br from-[#8C5C2F] to-[#D9A066] outline-[#B67B3E]": index === 2,
      "bg-gradient-to-br from-[#585859] to-[#BDBEBF] outline-[#3F3F40]": index !== 0 && index !== 1 && index !== 2,
    },
  )
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div className={innerClass} onClick={() => router.push(`/app/profile/${user.id_user}`)}>
      <Image
        src={user.logo_url ?? "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"}
        width={60}
        height={60}
        alt={"Artefact"}
        className="size-[50px] rounded-full object-cover"
      />

      <p className="hidden lg:block text-xl font-bolder text-white font-lilita drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        {user.username}
      </p>
      <div className="flex items-center gap-1">
        <Image src={rank.image} alt={rank.nom} width={100} height={100} className="size-[30px]" />
        <p className="text-xl font-bolder text-white font-lilita drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {user.xp} XP
        </p>
      </div>
      <p className="text-xl flex justify-end pr-4 font-bolder text-white font-lilita drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        #{index + 1}
      </p>
    </div>
  )
}
