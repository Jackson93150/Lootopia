import type { UserTrophy } from "@/app/types/trophy"
import Image from "next/image"
import PageContainer from "../container/page-container"

interface Props {
  trophys: UserTrophy[] | null
}

export default function TrophysView({ trophys }: Props) {
  const groupTrophiesByYearAndMonth = (trophies: UserTrophy[]) => {
    const groups: Record<string, Record<string, UserTrophy[]>> = {}

    for (const trophy of trophies) {
      const date = new Date(Number(trophy.date))
      if (Number.isNaN(date.getTime())) continue

      const year = date.getFullYear().toString()
      const month = date.toLocaleString("fr-FR", { month: "long" })

      if (!groups[year]) groups[year] = {}
      if (!groups[year][month]) groups[year][month] = []

      groups[year][month].push(trophy)
    }

    return groups
  }
  return (
    <div className="flex flex-col gap-10 w-full">
      {(() => {
        const grouped = groupTrophiesByYearAndMonth(trophys || [])
        const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))

        return years.map(year => (
          <div key={year} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex-grow h-[4px] bg-white/70" />
              <h2 className="text-white font-lilita text-[32px] whitespace-nowrap drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {year}
              </h2>
              <div className="flex-grow h-[4px] bg-white/70" />
            </div>
            {Object.keys(grouped[year])
              .sort((a, b) => new Date(`1 ${b} ${year}`).getTime() - new Date(`1 ${a} ${year}`).getTime())
              .map(month => (
                <div key={month} className="flex flex-col gap-4">
                  <h2 className="text-white uppercase font-lilita w-full text-center text-[26px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    {month}
                  </h2>

                  <div className="grid grid-cols-1 0-5xl:grid-cols-2 1xl:grid-cols-3 2-5xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-6">
                    {grouped[year][month].map(trophy => (
                      <PageContainer stripes color="white" size="sm" key={trophy.trophy_id + trophy.date}>
                        <div className="w-full rounded-[16px] flex flex-col items-center justify-start p-2 h-[250px] relative shine-effect shine-effect-hover">
                          <div className="flex items-center justify-center flex-grow">
                            <Image
                              src={trophy.trophy.picture_url}
                              alt={trophy.trophy.name}
                              width={180}
                              height={180}
                              className="object-cover rounded"
                            />
                          </div>
                        </div>
                      </PageContainer>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ))
      })()}
    </div>
  )
}
