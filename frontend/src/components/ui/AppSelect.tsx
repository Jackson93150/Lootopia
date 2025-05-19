import type { SelectHTMLAttributes } from "react"

type AppSelectProps = SelectHTMLAttributes<HTMLSelectElement>

export default function AppSelect(props: AppSelectProps) {
  return (
    <div className="flex relative w-full pb-1">
      <select
        {...props}
        className={`w-full h-11 px-2 z-10 rounded-xl text-xs border-5 outline-none transition-colors bg-[#D9E7F2] placeholder:text-gray-500 border-[#8B95B3] focus:border-[#8B95B3] hover:border-[#8B95B3]
          appearance-none pr-6 ${props.className ?? ""}`}
      >
        {props.children}
      </select>
      <span className="absolute bottom-0 w-full rounded-xl h-10 bg-[#280F0C]" />
    </div>
  )
}
