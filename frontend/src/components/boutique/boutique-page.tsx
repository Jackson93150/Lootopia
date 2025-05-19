import type { CrownPackage } from "@/app/types/crown-package"
import PageContainer from "../container/page-container"
import Card from "./card"

type ShopProps = {
  crownPackages: CrownPackage[]
}

export default function Shop({ crownPackages }: ShopProps) {
  return (
    <div className="flex size-full justify-center items-center">
      <PageContainer>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-5 h-[70vh] w-[85vw] p-4 overflow-y-auto">
          {crownPackages.map((crownPackage: CrownPackage) => (
            <Card
              key={crownPackage.id_firebase}
              id_firebase={crownPackage.id_firebase}
              amount={crownPackage.crown_amount.toString()}
              price={crownPackage.promotion ? crownPackage.promotion_price : crownPackage.price_euro}
            />
          ))}
        </div>
      </PageContainer>
    </div>
  )
}
