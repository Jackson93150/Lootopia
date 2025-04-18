import type { ChangeEvent } from "react"

type ToggleSwitchProps = {
  id: string
  label: string
  error?: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  labelClassName?: string
  onLabelClick?: () => void
}

export default function ToggleSwitch({
  id,
  label,
  checked,
  onChange,
  error,
  labelClassName,
  onLabelClick,
}: ToggleSwitchProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-4">
        <label htmlFor={id} className="relative cursor-pointer">
          <input type="checkbox" id={id} checked={checked} onChange={onChange} className="sr-only" />
          <div
            className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
              checked ? "bg-orange" : "bg-gray-400"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${
                checked ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </div>
        </label>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <span className={`text-sm text-dark-brown ${labelClassName ?? ""} `} onClick={onLabelClick}>
          {label}
        </span>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
