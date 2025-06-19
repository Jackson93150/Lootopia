import AppInput from "@/components/ui/AppInput"
import type { LatLngExpression, LeafletMouseEvent } from "leaflet"
import L from "leaflet"
import { type Dispatch, type SetStateAction, useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet"

type SecondStepProps = {
  setLatitude: Dispatch<SetStateAction<number | null>>
  setLongitude: Dispatch<SetStateAction<number | null>>
  latitude: number | null
  longitude: number | null
  setStepCreateHunting: Dispatch<SetStateAction<number>>
  handleSubmit: (isDraft?: boolean) => void
}

export default function SecondStep({
  setLatitude,
  setLongitude,
  latitude,
  longitude,
  setStepCreateHunting,
  handleSubmit
}: SecondStepProps) {
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression | null>(
    latitude && longitude ? [latitude, longitude] : null,
  )

  useEffect(() => {
    if (latitude && longitude) {
      setMarkerPosition([latitude, longitude])
    }
  }, [latitude, longitude])

  const greenIcon = L.icon({
    iconUrl: "/map_marker.svg",
    iconSize: [35, 35],
  })

  const MapClickHandler = ({
    onClick,
  }: {
    onClick: (e: LeafletMouseEvent) => void
  }) => {
    useMapEvents({
      click(e) {
        onClick(e)
      },
    })
    return null
  }

  const handleMapClick = (e: LeafletMouseEvent) => {
    const { lat, lng } = e.latlng
    setLatitude(lat)
    setLongitude(lng)
    setMarkerPosition([lat, lng])
  }

  const defaultCenter: LatLngExpression = [latitude ?? 51.505, longitude ?? -0.09]

  return (
    <div className="m-4 w-[80vw] lg:w-[50vw] h-[70vh] gap-3 flex flex-col justify-between">
      <div className="w-full h-[75%]">
        <MapContainer center={defaultCenter} zoom={5} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">Carto</a> contributors'
          />
          <MapClickHandler onClick={handleMapClick} />
          {markerPosition && (
            <Marker position={markerPosition} icon={greenIcon}>
              <Popup>
                Lat: {(markerPosition as [number, number])[0].toFixed(5)}
                <br />
                Lng: {(markerPosition as [number, number])[1].toFixed(5)}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <div className="flex gap-4">
        <AppInput
          type="number"
          label="Latitude"
          placeholder="Latitude"
          value={latitude ?? ""}
          onChange={e => setLatitude(Number(e.target.value))}
        />
        <AppInput
          type="number"
          label="Longitude"
          placeholder="Longitude"
          value={longitude ?? ""}
          onChange={e => setLongitude(Number(e.target.value))}
        />
      </div>

      <div className="w-full flex justify-around">
        <button
          onClick={() => setStepCreateHunting(0)}
          className=" h-[40px] px-4 py-1 rounded-[8px] outline-[2px] cursor-pointer border-[2px] border-[#F65F26]/70 bg-gradient-to-b from-[#E9721E] to-[#F29D25]"
        >
          <span className="stroke-1 font-lilita text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Précédent</span>
        </button>
        <button
          onClick={() => setStepCreateHunting(2)}
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
