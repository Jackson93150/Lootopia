import type { InputHTMLAttributes } from "react"
import { forwardRef } from "react"

type AppInputProps = InputHTMLAttributes<HTMLInputElement>

const AppInput = forwardRef<HTMLInputElement, AppInputProps>((props, ref) => {
  return (
    <div className="flex relative w-full pb-1">
      <input
        {...props}
        ref={ref}
        className={`w-full h-11 px-2 z-10 rounded-xl text-xs border-5 outline-none transition-colors bg-[#D9E7F2] placeholder:text-gray-500 border-[#8B95B3] focus:border-[#8B95B3] hover:border-[#8B95B3]
          ${props.className ?? ""}`}
      />
      <span className="absolute bottom-0 w-full rounded-xl h-10 bg-[#280F0C]" />
    </div>
  )
})

AppInput.displayName = "AppInput"
export default AppInput
