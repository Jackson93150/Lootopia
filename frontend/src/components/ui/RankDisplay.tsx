interface Rank {
  nom: string
  xp_min: number
  xp_max: number
  image: string
}

const RANKS: Rank[] = [
  {
    nom: "bronze",
    xp_min: 0,
    xp_max: 2500,
    image:
      "https://firebasestorage.googleapis.com/v0/b/lootopia-88ff0.firebasestorage.app/o/rank%2Fbronze.svg?alt=media&token=0c212c6e-a1d7-4343-b9e8-25d8b83e22f7",
  },
  {
    nom: "silver",
    xp_min: 2500,
    xp_max: 5000,
    image:
      "https://firebasestorage.googleapis.com/v0/b/lootopia-88ff0.firebasestorage.app/o/rank%2Fsilver.svg?alt=media&token=9ca7620d-c345-401d-9ded-493b6a1a592c",
  },
  {
    nom: "gold",
    xp_min: 5000,
    xp_max: 8000,
    image:
      "https://firebasestorage.googleapis.com/v0/b/lootopia-88ff0.firebasestorage.app/o/rank%2Fgold.svg?alt=media&token=158b402f-b3a4-42a7-b82c-c725765956d0",
  },
  {
    nom: "platinum",
    xp_min: 8000,
    xp_max: 13000,
    image:
      "https://firebasestorage.googleapis.com/v0/b/lootopia-88ff0.firebasestorage.app/o/rank%2Fplatinum.svg?alt=media&token=9b0b3a77-4143-484f-9d27-26da6d422342",
  },
  {
    nom: "diamond",
    xp_min: 13000,
    xp_max: 20000,
    image:
      "https://firebasestorage.googleapis.com/v0/b/lootopia-88ff0.firebasestorage.app/o/rank%2Fdiamond.svg?alt=media&token=bbbe79af-eea4-44e0-a687-a8af1027484c",
  },
  {
    nom: "champion",
    xp_min: 20000,
    xp_max: 30000,
    image:
      "https://firebasestorage.googleapis.com/v0/b/lootopia-88ff0.firebasestorage.app/o/rank%2Fchampion.svg?alt=media&token=e7ae893c-1f86-48a9-8398-8fa6e7f56b05",
  },
]

interface RankDisplayProps {
  xp: number
}

export function RankDisplay({ xp }: RankDisplayProps) {
  const rank = RANKS.find(r => xp >= r.xp_min && xp < r.xp_max) || RANKS[RANKS.length - 1]
  const isChampion = rank.nom === "champion"

  return (
    <div className="flex items-center space-x-2 text-white font-lilita text-[16px] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
      <img src={rank.image} alt={rank.nom} className="w-6 h-6" />
      <span>{xp}</span>
      {!isChampion && (
        <>
          <span>/</span>
          <span>{rank.xp_max}</span>
        </>
      )}
      <span>XP</span>
    </div>
  )
}
