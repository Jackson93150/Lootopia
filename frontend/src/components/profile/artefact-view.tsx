import type { UserArtefact } from "@/app/types/artefact"
import ArtefactCard from "../artefact/artefactCard"
import { ArtefactSkeletonCard } from "../skeleton/artefactSkeleton"

interface Props {
  artefacts: UserArtefact[] | null
  artefactsExported: UserArtefact[] | null
  loading: boolean
}

export default function ArtefactView({ artefacts, artefactsExported, loading }: Props) {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex-grow h-[4px] bg-white/70" />
        <h2 className="text-white font-lilita text-[32px] whitespace-nowrap drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Mes Artefacts
        </h2>
        <div className="flex-grow h-[4px] bg-white/70" />
      </div>

      <div className="grid grid-cols-1 0-5xl:grid-cols-2 1xl:grid-cols-3 2-5xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-6">
        {loading ? (
          <>
            <ArtefactSkeletonCard />
            <ArtefactSkeletonCard />
            <ArtefactSkeletonCard />
            <ArtefactSkeletonCard />
            <ArtefactSkeletonCard />
            <ArtefactSkeletonCard />
          </>
        ) : (
          artefacts?.map(artefact => <ArtefactCard key={artefact.id_firebase} artefact={artefact} />)
        )}
      </div>

      {artefactsExported?.length !== 0 && (
        <>
          <div className="flex items-center gap-4">
            <div className="flex-grow h-[4px] bg-white/70" />
            <h2 className="text-white font-lilita text-[32px] whitespace-nowrap drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              Artefacts Exporté
            </h2>
            <div className="flex-grow h-[4px] bg-white/70" />
          </div>
          <div className="grid grid-cols-1 0-5xl:grid-cols-2 1xl:grid-cols-3 2-5xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-6 brightness-50 pointer-events-none">
            {artefactsExported?.map(artefact => (
              <ArtefactCard key={artefact.id_firebase} artefact={artefact} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
