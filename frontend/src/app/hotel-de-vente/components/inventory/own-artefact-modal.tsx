import type { OwnArtefactModalProps } from "@/app/types/artefact"
import AppButton from "@/components/ui/AppButton"
import AppInput from "@/components/ui/AppInput"
import AppModal from "@/components/ui/AppModal"
import AppSelect from "@/components/ui/AppSelect"
import ToggleSwitch from "@/components/ui/ToggleSwitch"
import Image from "next/image"

export default function OwnArtefactModal({
  modalIsOpen,
  closeModal,
  selectedOwnArtefact,
  registerForm,
  handleSubmit,
  onSubmit,
  onInvalid,
  watch,
  setValue,
}: OwnArtefactModalProps) {
  const customStylesModal = {
    content: {
      display: "flex",
      flexDirection: "column",
    },
  }

  return (
    <AppModal modalIsOpen={modalIsOpen} closeModal={closeModal} styles={customStylesModal}>
      {selectedOwnArtefact && (
        <>
          <div className="flex items-center w-full justify-around p-5">
            <Image src={selectedOwnArtefact.artefact.image} width={150} height={150} alt={"Artefact"} />
            <div className="flex flex-col text-center">
              <p className="font-bolder text-2xl">{selectedOwnArtefact.artefact.name}</p>

              <div className="text-center">
                <p className="font-bolder">RARETÉ</p>
                <p>{selectedOwnArtefact.artefact.rarity}</p>
              </div>

              <div className="text-center">
                <p className="font-bolder">TYPE</p>
                <p>{selectedOwnArtefact.artefact.type}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="w-full flex flex-col items-center">
            <div className="flex flex-col items-center gap-2 mb-2 w-full justify-around">
              <div className="flex flex-col gap-1">
                <AppInput
                  type="number"
                  id="auction_price"
                  placeholder="Prix d'enchère de départ"
                  className="!w-50"
                  {...registerForm("auction_price", { valueAsNumber: true })}
                />
              </div>

              <div className="flex flex-col gap-1">
                <AppSelect id="timer" {...registerForm("timer")}>
                  <option value="">-- Choisissez une durée --</option>
                  <option value="1h">1 heure</option>
                  <option value="1d">1 jour</option>
                  <option value="1w">1 semaine</option>
                </AppSelect>
              </div>

              <div className="flex flex-col gap-1">
                <ToggleSwitch
                  id="direct_sale"
                  label="Ajouter une vente direct"
                  checked={watch("direct_sale")}
                  onChange={e => setValue("direct_sale", e.target.checked)}
                />
                {watch("direct_sale") && (
                  <AppInput
                    type="number"
                    id="fix_price"
                    placeholder="Prix d'achat direct"
                    className="!w-full"
                    disabled={!watch("direct_sale")}
                    {...registerForm("fix_price", { valueAsNumber: true })}
                  />
                )}
              </div>
            </div>

            <AppButton type="submit" className="!w-50 !mt-2 !text-center">
              Vendre
            </AppButton>
          </form>
        </>
      )}
    </AppModal>
  )
}
