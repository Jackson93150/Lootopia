import clsx from "clsx"

export default function SkeletonCell({ index }: { index: number }) {
  const skeletonClass = clsx(
    "pl-4 py-2 w-full grid grid-cols-4 items-center justify-between p-1 rounded-[8px] outline-[4px] animate-pulse",
    {
      "bg-gradient-to-br from-[#F38424] to-[#F7C929] outline-[#F2E30B]": index === 0,
      "bg-gradient-to-br from-[#55748E] to-[#C0D3E2] outline-[#D9E7F2]": index === 1,
      "bg-gradient-to-br from-[#8C5C2F] to-[#D9A066] outline-[#B67B3E]": index === 2,
      "bg-gradient-to-br from-[#585859] to-[#BDBEBF] outline-[#3F3F40]": index > 2,
    },
  )

  return (
    <div className={skeletonClass}>
      <div className="size-[50px] rounded-full bg-white/40" />
      <div className="hidden lg:block h-[20px] w-[120px] bg-white/40 rounded" />
      <div className="flex items-center gap-2">
        <div className="size-[30px] bg-white/40 rounded" />
        <div className="h-[20px] w-[60px] bg-white/40 rounded" />
      </div>
      <div className="h-[20px] w-[40px] bg-white/40 rounded justify-self-end pr-4" />
    </div>
  )
}
