import AppButton from "@/components/ui/AppButton"
import { createSessionCheckout } from "@/service/shop"
import Image from "next/image"
import PageContainer from "../container/page-container"

export default function Card({
  amount,
  price,
  id_firebase,
}: {
  amount: string
  price: number
  id_firebase: string
}) {
  return (
    <div className="flex h-[90%] w-full lg:w-[21%]">
      <PageContainer size="sm" color="brown">
        <div className="py-12 items-center flex-col flex h-full w-full">
          <Image src={"/images/couronnes.png"} width={200} height={200} alt="pack_couronnes" />
          <div className="flex flex-col gap-8 items-center justify-around h-full w-full">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white">{amount}</h1>
              <h2 className="text-3xl font-bold text-white">Couronnes</h2>
            </div>
            <AppButton
              onClick={async () => {
                try {
                  const url = await createSessionCheckout(id_firebase)
                  if (url) {
                    window.location.href = url
                  }
                } catch (err) {
                  console.error("Erreur lors de la création de la session Stripe :", err)
                }
              }}
              className="!w-60 xl:!w-50 lg:!w-40 hover:scale-[1.1] transition-all"
            >
              {price} €
            </AppButton>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
