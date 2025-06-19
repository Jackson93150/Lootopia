import PageContainer from "@/components/container/page-container"
import AppInput from "@/components/ui/AppInput"
import type { Dispatch, SetStateAction } from "react"

type ThirdStepProps = {
  setEnigmes: Dispatch<SetStateAction<never[]>>
  enigmes: string[]
  setIndices: Dispatch<SetStateAction<never[]>>
  indices: string[]
  setStepCreateHunting: Dispatch<SetStateAction<number>>
  handleSubmit: (isDraft?: boolean) => void
}

export default function ThirdStep({
  setEnigmes,
  enigmes,
  setIndices,
  indices,
  setStepCreateHunting,
  handleSubmit,
}: ThirdStepProps) {
  const handleAddIndice = () => {
    if (indices.length < 3) {
      setIndices([...indices, ""])
    }
  }

  const handleRemoveIndice = (index: number) => {
    const newIndices = indices.filter((_, i) => i !== index)
    setIndices(newIndices)
  }

  const handleIndiceChange = (value: string, index: number) => {
    const newIndices = [...indices]
    newIndices[index] = value
    setIndices(newIndices)
  }

  const handleAddEnigme = () => {
    if (enigmes.length < 3) {
      setEnigmes([...enigmes, ""])
    }
  }

  const handleRemoveEnigme = (index: number) => {
    const newEnigmes = enigmes.filter((_, i) => i !== index)
    setEnigmes(newEnigmes)
  }

  const handleEnigmeChange = (value: string, index: number) => {
    const newEnigmes = [...enigmes]
    newEnigmes[index] = value
    setEnigmes(newEnigmes)
  }

  return (
    <div className="px-12 py-4 w-[80vw] lg:w-[50vw] h-[70vh] gap-6 flex flex-col justify-start">
      <PageContainer size="sm" color="white">
        <div className="w-full overflow-y-auto flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-white font-lilita drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-2xl font-semibold">
              Indices
            </h2>

            {indices.map((indice, index) => (
              <div key={index} className="flex items-center gap-2 w-full">
                <AppInput
                  value={indice}
                  onChange={e => handleIndiceChange(e.target.value, index)}
                  className="!w-full"
                  type="text"
                  placeholder={`Indice ${index + 1}`}
                />
                {indices.length > 1 && (
                  <button
                    onClick={() => handleRemoveIndice(index)}
                    className="font-bold text-orange-500 hover:text-orange-700"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
            {indices.length < 3 && (
              <button onClick={handleAddIndice} className="text-xl font-bold text-orange-500 hover:text-orange-700">
                +
              </button>
            )}
          </div>

          {/* Énigmes */}
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-2xl font-semibold text-white font-lilita drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              Énigmes
            </h2>

            {enigmes.map((enigme, index) => (
              <div key={index} className="flex items-center gap-2 w-full">
                <AppInput
                  value={enigme}
                  onChange={e => handleEnigmeChange(e.target.value, index)}
                  className="!w-full"
                  type="text"
                  placeholder={`Enigme ${index + 1}`}
                />
                {enigmes.length >= 1 && (
                  <button
                    onClick={() => handleRemoveEnigme(index)}
                    className="font-bold text-orange-500 hover:text-orange-700"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
            {enigmes.length < 3 && (
              <button onClick={handleAddEnigme} className="text-xl font-bold text-orange-500 hover:text-orange-700">
                +
              </button>
            )}
          </div>
        </div>
      </PageContainer>
      {/* Bouton continuer */}
      <div className="w-full flex justify-around mt-4">
        <button
          onClick={() => setStepCreateHunting(1)}
          className=" h-[40px] px-4 py-1 rounded-[8px] outline-[2px] cursor-pointer border-[2px] border-[#F65F26]/70 bg-gradient-to-b from-[#E9721E] to-[#F29D25]"
        >
          <span className="stroke-1 font-lilita text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Précédent</span>
        </button>
        <button
          onClick={() => handleSubmit()}
          className="h-[40px] px-4 py-1 rounded-[8px] outline-[2px] cursor-pointer border-[2px] border-[#F65F26]/70 bg-gradient-to-b from-[#E9721E] to-[#F29D25]"
        >
          <span className="stroke-1 font-lilita text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Créer</span>
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
