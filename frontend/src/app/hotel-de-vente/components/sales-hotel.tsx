import AppButton from "@/components/ui/AppButton"
import AppInput from "@/components/ui/AppInput"
import { addAuction, searchAuctions } from "@/service/sales-hotel"
import Image from "next/image"
import { useEffect, useState } from "react"
import AuctionModal from "./auction-modal"
import { ToastContainer, toast } from "react-toastify"
import { schemaAddAuction } from "@/lib/zod/schemas"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { me } from "@/service/user"

type FormValues = z.infer<typeof schemaAddAuction>

export default function SalesHotel() {
  const [user, setUser] = useState()
  const [auctions, setAuctions] = useState<any[]>([])
  const [selectedAuction, setSelectedAuction] = useState(null)
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)

  console.log(user)
  function closeModal() {
    setIsOpen(false)
    setSelectedAuction(null)
  }

  useEffect(() => {
    fetchAuctions(query)
  }, [query])

  const fetchAuctions = async (queryString: string) => {
    try {
      setLoading(true)
      const result = await searchAuctions(queryString)
      setAuctions(result.auctions)
    } catch (error) {
      console.error("Erreur lors de la recherche :", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function getMe() {
      try {
        const response = await me()

        setUser(response.data.user)
      } catch (error) {
        console.error("Erreur lors de la récupération des crown packages :", error)
      }
    }

    getMe()
  }, [])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaAddAuction),
    defaultValues: {
      auction_price: undefined,
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const { auction_price } = values

      if (selectedAuction) {
        await addAuction(
          selectedAuction.auction_id,
          auction_price,
        )

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

  const onInvalid = (errors: typeof formState.errors) => {
    Object.values(errors).forEach(error => {
      if (error?.message) {
        toast.error(error.message, {
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
    })
  }

  return (
    <>
      <div className="items-center flex-col flex bg-[#A96A3D] h-[100%] w-full rounded-lg border-4 border-[#5B3E29]">
        <div className="flex flex-col items-center h-full w-full">
          <p className="text-3xl font-bolder text-white py-4">Hotel de vente</p>
          <div className="w-[90%]">
            <AppInput
              type="text"
              placeholder="Recherchez un artefact, par rareté, par prix..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-1 px-2 mt-4">
            {loading && <p className="text-white text-center">Chargement...</p>}
            {!loading && auctions.length === 0 && <p className="text-white text-center">Aucun résultat</p>}

            {auctions.map((auction, index) => (
              <div
                key={index}
                className="w-full flex items-center justify-between p-1 bg-gradient-to-br from-[#FAC27D] to-[#f5c249] rounded border-[2px] border-[#5B3E29]"
              >
                <Image src={auction.image} width={60} height={60} alt={"Artefact"} />
                <p className="text-xl font-bolder text-white">{auction.artefact_name}</p>
                <p className="text-xl font-bolder text-white">{auction.artefact_rarity}</p>
                <div className="flex items-center gap-1">
                  <p className="text-xl font-bolder text-white">{auction.auction_price}</p>
                  <Image src={"/images/couronnes.png"} width={40} height={40} alt="Couronnes" />
                </div>
                <AppButton
                  className="!w-30"
                  onClick={() => {
                    setIsOpen(true)
                    setSelectedAuction(auction)
                  }}
                >
                  Acheter
                </AppButton>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AuctionModal modalIsOpen={modalIsOpen} closeModal={closeModal} selectedAuction={selectedAuction} />
      <ToastContainer position="bottom-right" theme="colored" limit={2} stacked />
    </>
  )
}