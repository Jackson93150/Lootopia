export function ArtefactSkeletonCard() {
  return (
    <div className="relative w-[250px] h-[350px] p-[5px]">
      <div className="w-full h-full rounded-[28px] bg-[#495467] flex justify-center items-center outline-[6px] outline-black">
        <div className="flex relative w-[calc(100%-24px)] h-[calc(100%-28px)] rounded-[16px] outline-[12px] outline-[#8B95B3] p-[12px] bg-gradient-to-r from-[#516074] to-[#BCCFDF] overflow-hidden">
          <div className="w-full h-full shine-effect shine-effect-loop z-10 rounded-[28px]" />
        </div>
      </div>
    </div>
  )
}
