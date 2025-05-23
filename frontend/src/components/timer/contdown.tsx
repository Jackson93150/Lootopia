import Image from "next/image"
import Countdown from "react-countdown"

function getEndOfMonthDate(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0)
}

export default function MonthlyCountdownTimer() {
  const endOfMonth = getEndOfMonthDate()

  return (
    <Countdown
      date={endOfMonth}
      renderer={({ days, hours, minutes, seconds }) => (
        <div className="flex justify-center items-center gap-4">
          <span className="text-3xl font-bolder text-white py-4 font-lilita uppercase drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {days}j {hours}h {minutes}m {seconds}s
          </span>
          <Image src="/images/timer.svg" alt="timer" width={250} height={250} className="size-[40px]" />
        </div>
      )}
      //onComplete={}
    />
  )
}
