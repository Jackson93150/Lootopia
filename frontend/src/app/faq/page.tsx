import PageContainer from "@/components/container/page-container"
import { faqData } from "@/constants/faq"

export default function Faq() {
  return (
    <div className="w-screen h-screen flex pt-40 px-15 pb-10">
      <PageContainer stripes>
        <div className="z-20 flex flex-col lg:flex-row items-center justify-between p-4 gap-5 h-full w-full">
          <div className="relative items-center flex-col h-full w-full">
            <PageContainer size="sm" color="brown">
              <div className="flex flex-col items-center h-full w-full">
                <div className="w-[95%] flex flex-col gap-1 p-2 mt-4 max-h-[500px] overflow-y-auto gap-4">
                  {faqData.map((faqData, index) => (
                    <div
                      key={index}
                      className="w-full flex flex-col items-center text-center p-1 gap-5 bg-gradient-to-br from-[#F38424] to-[#F7C929] outline-[#F2E30B] rounded-[8px] outline-[4px]"
                    >
                      <p className="hidden lg:block text-xl font-bolder text-white font-lilita drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        {faqData.question}
                      </p>
                      <p className="hidden lg:block text-md text-white font-lilita drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        {faqData.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </PageContainer>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
