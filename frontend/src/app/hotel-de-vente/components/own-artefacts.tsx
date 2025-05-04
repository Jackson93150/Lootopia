import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import { getUserArtefact } from "@/service/artefacts";
import { useState, useEffect } from "react";
import Image from "next/image"; 
import { schemaSale } from "@/lib/zod/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { createSale } from "@/service/sales-hotel";

type FormValues = z.infer<typeof schemaSale>

export default function OwnArtefacts() {
    const [ownArtefacts, setOwnArtefacts] = useState([]);
    const [selectedArtefact, setSelectedArtefact] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormValues>({
        resolver: zodResolver(schemaSale),
      })

      const onSubmit = async (values: FormValues) => {
        try {
          const { crown_price } = values
          if (selectedArtefact) {
            const artefactId = selectedArtefact.id_firebase

            await createSale(artefactId, crown_price)

            toast.success("Mise en vente réussi", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              })

            setOwnArtefacts(prev =>
                prev.filter(artefact => artefact.id_firebase !== artefactId)
              );
        
            setSelectedArtefact(null);
          }
        } catch (error) {
          const err = error as Error
          toast.error(err.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        }
      }
  
    useEffect(() => {
      async function fetchOwnArtefacts() {
        try {
          const data = await getUserArtefact();

          setOwnArtefacts(data);
        } catch (error) {
          console.error("Erreur lors de la récupération des artefacts :", error);
        }
      }
      fetchOwnArtefacts();
    }, []);
  
    return (
      <>
        <div className="grid grid-cols-4 gap-1 pointer">
          {ownArtefacts.map((artefact, index) => (
            <div
              key={index}
              className="cursor-pointer border-1 border-[#F2E30B] rounded bg-gradient-to-r from-[#F38424] to-[#F7C929]"
              onClick={() => setSelectedArtefact(artefact)}
            >
              <Image src={artefact.image} width={75} height={75} alt="artefact" />
            </div>
          ))}
        </div>
  
        {/* MODAL */}
        {selectedArtefact && (
          <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-10" onClick={() => setSelectedArtefact(null)}>
            <div className="flex flex-col items-center py-2 rounded-lg w-[90%] max-w-md text-black bg-gradient-to-r from-[#F38424] to-[#F7C929]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedArtefact.image}
                width={150}
                height={150}
                alt={'Artefact'}
              />
              <div className="text-center flex flex-col gap-3 py-2">
                <p><strong>Rareté:</strong> {selectedArtefact.rarity}</p>
                <p><strong>Type:</strong> {selectedArtefact.type}</p>
              </div>
              <div className="flex flex-col gap-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AppInput type="number" id="sale_price" placeholder="Prix en couronnes" {...register('crown_price', { valueAsNumber: true })}/>
                    <AppButton type="submit" className="!w-50">
                        Vendre
                    </AppButton>
                    <ToastContainer position="bottom-right" theme="colored" limit={2} stacked />
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  