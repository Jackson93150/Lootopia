import type { InputHTMLAttributes } from "react"

type AppInputProps = InputHTMLAttributes<HTMLInputElement>

export default function AppInput(props: AppInputProps) {
  return (
    <div className="flex relative w-full pb-1">
      <input
        {...props}
        className={`w-full h-11 px-2 z-10 rounded-xl text-xs border-5 outline-none transition-colors bg-sand placeholder:text-gray-500 border-[#D7B189] focus:border-[#D7B189] hover:border-[#D7B189]
            ${props.className ?? ""}`}
      />
      <span className="absolute bottom-0 w-full rounded-xl h-10 bg-[#280F0C]" />
    </div>
  )
}
