import Card from "./card"

export default function BoutiquePage({ crownPackages }: any) {
  return (
    <div className="h-fit py-10 lg:py-0 lg:h-screen w-full bg-[url('/images/backgrounds/backgroundAuth.png')]">
      <div className="flex size-full justify-center items-center">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-5 rounded-lg h-[70%] w-[85%] p-4 bg-gradient-to-r from-[#F38424] to-[#F7C929] border-4 border-[#F2E30B]">
          {crownPackages.map((crownPackage: any, index: string) => (
            <Card
              key={index}
              id_firebase={crownPackage.id_firebase}
              amount={crownPackage.crown_amount.toString()}
              price={crownPackage.promotion ? crownPackage.promotion_price : crownPackage.price_euro}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

