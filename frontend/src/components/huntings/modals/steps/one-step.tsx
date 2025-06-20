import AppInput from "@/components/ui/AppInput"
import AppSelect from "@/components/ui/AppSelect"
import type { Dispatch, SetStateAction } from "react"

type OneStepProps = {
  setStepCreateHunting: Dispatch<SetStateAction<number>>
  title: string | null
  setTitle: Dispatch<SetStateAction<string | null>>
  description: string | null
  setDescription: Dispatch<SetStateAction<string | null>>
  type: "RA" | "carte" | undefined
  setType: Dispatch<SetStateAction<"RA" | "carte" | undefined>>
  isPublic: boolean
  setIsPublic: Dispatch<SetStateAction<boolean>>
  feed: number | null
  setFees: Dispatch<SetStateAction<number | null>>
  limitParticipant: number | null
  setLimitParticipant: Dispatch<SetStateAction<number | null>>
  startedAt: number | null
  setStartedAt: Dispatch<SetStateAction<number | null>>
  endedAt: number | null
  setEndedAt: Dispatch<SetStateAction<number | null>>
  handleSubmit: (isDraft?: boolean) => void
}

export default function OneStep({
  setStepCreateHunting,
  title,
  setTitle,
  description,
  setDescription,
  type,
  setType,
  isPublic,
  setIsPublic,
  feed,
  setFees,
  limitParticipant,
  setLimitParticipant,
  startedAt,
  setStartedAt,
  endedAt,
  setEndedAt,
  handleSubmit
}: OneStepProps) {
  return (
    <div className="mx-12 py-4 w-[50vw] h-[70vh] gap-3 flex flex-col justify-center overflow-y-auto ">
      <AppInput placeholder="Titre de la chasse" value={title ?? ""} onChange={e => setTitle(e.target.value)} />

      <textarea
        placeholder="Description de la chasse"
        value={description ?? ""}
        onChange={e => setDescription(e.target.value)}
        className="w-full h-[70%] p-2 bg-[#D9E7F2] placeholder:text-gray-500 border-[#8B95B3] focus:border-[#8B95B3] hover:border-[#8B95B3] border-5 rounded-xl bg-[#280F0C] text-black outline-black font-lilita resize-none outline-none"
        rows={6}
      ></textarea>

      <AppSelect value={type ?? ""} onChange={e => setType(e.target.value as "RA" | "carte")}>
        <option value="">-- Choisissez un type de chasse --</option>
        <option value="carte">Carte Intéractive</option>
        <option value="RA">Réalité Augmentée</option>
      </AppSelect>

      <AppSelect value={isPublic ? "isPublic" : "isPrivate"} onChange={e => setIsPublic(e.target.value === "isPublic")}>
        <option value="">-- Chasse publique ? --</option>
        <option value="isPublic">Oui</option>
        <option value="isPrivate">Non</option>
      </AppSelect>

      <div className="flex flex-col lg:flex-row w-full justify-around gap-2">
        <AppInput
          label="Frais d'entrée en couronnes"
          type="number"
          placeholder="Frais d'entrée ?"
          value={feed ?? ""}
          onChange={e => setFees(Number(e.target.value))}
          min={0}
        />
        <AppInput
          label="Limite de participants"
          type="number"
          placeholder="Limite de participants"
          value={limitParticipant ?? ""}
          onChange={e => setLimitParticipant(Number(e.target.value))}
          min={1}
        />
      </div>
      <div className="flex flex-col lg:flex-row w-full justify-around gap-2">
        <AppInput
          className="text-gray-500"
          label="Date de lancement"
          type="datetime-local"
          placeholder="Date de lancement"
          value={startedAt ? new Date(startedAt).toISOString().slice(0, -8) : ""}
          onChange={e => setStartedAt(new Date(e.target.value).getTime())}
        />
        <AppInput
          className="text-gray-500"
          label="Date de fin"
          type="datetime-local"
          placeholder="Date de fin"
          value={endedAt ? new Date(endedAt).toISOString().slice(0, -8) : ""}
          onChange={e => setEndedAt(new Date(e.target.value).getTime())}
        />
      </div>

      <div className="w-full flex justify-around">
        <button
          onClick={() => setStepCreateHunting(1)}
          className=" h-[40px] px-4 py-1 rounded-[8px] outline-[2px] cursor-pointer border-[2px] border-[#F65F26]/70 bg-gradient-to-b from-[#E9721E] to-[#F29D25]"
        >
          <span className="stroke-1 font-lilita text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Continuer</span>
        </button>
        <button
            onClick={() => handleSubmit(true)}
            className="h-[40px] px-4 py-1 rounded-[8px] outline-[2px] cursor-pointer border-[2px] border-gray-300 bg-gradient-to-b from-gray-200 to-gray-400"
        >
      <span className="stroke-1 font-lilita text-black drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.4)]">
        Enregistrer le brouillon
      </span>
        </button>
      </div>
    </div>
  )
}
