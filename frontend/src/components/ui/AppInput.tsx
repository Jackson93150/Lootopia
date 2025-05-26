import type { InputHTMLAttributes } from "react"
import { forwardRef } from "react"

type AppInputProps = {
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(({ label, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-sm font-medium mb-1 text-white font-lilita drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {label}
        </label>
      )}
      <div className="flex relative w-full pb-1">
        <input
          {...props}
          ref={ref}
          className={`w-full h-11 px-2 z-10 rounded-xl text-xs border-5 outline-none transition-colors bg-[#D9E7F2] placeholder:text-gray-500 border-[#8B95B3] focus:border-[#8B95B3] hover:border-[#8B95B3]
          ${props.className ?? ""}`}
        />
        <span className="absolute bottom-0 w-full rounded-xl h-10 bg-[#280F0C]" />
      </div>
    </div>
  )
})

AppInput.displayName = "AppInput"
export default AppInput
