import type { User } from "@/app/types/user"
import { EditIcon } from "@/assets/icons/edit.icon"
import { updateBiography } from "@/service/user"
import { uploadProfilePicture } from "@/service/user"
import Image from "next/image"
import { type Dispatch, type SetStateAction, useRef, useState } from "react"
import PageContainer from "../container/page-container"

interface Props {
  user: User | null
  profileImage: string | null
  setProfileImage: Dispatch<SetStateAction<string | null>>
}

export default function ProfileView({ user, profileImage, setProfileImage }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [bioEditMode, setBioEditMode] = useState(false)
  const [editedBio, setEditedBio] = useState("")

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const res = await uploadProfilePicture(file)
      setProfileImage(typeof res === "string" ? res : res.logo_url)
    } catch (error) {
      console.error("Erreur upload image:", error)
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }
  return (
    <PageContainer color="grey" size="sm" className="h-full grow max-w-[300px]">
      <div className="flex flex-col gap-2">
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          className="w-full h-[30%] bg-gradient-to-r from-[#B1C7E4] to-[#EFF9FD] rounded-[8px] border p-2 relative group cursor-pointer"
          onClick={handleImageClick}
        >
          <div className="w-full h-full rounded-[8px] border overflow-hidden relative">
            <Image
              src={
                profileImage ?? "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"
              }
              alt="profile"
              width={500}
              height={500}
              className="size-full object-cover transition duration-300 group-hover:brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white text-sm font-bold">
              Changer l'image
            </div>
          </div>
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
        </div>

        <div className="w-full grow bg-gradient-to-r from-[#B1C7E4] to-[#EFF9FD] rounded-[8px] border p-2 flex flex-col gap-2 relative">
          {!bioEditMode && (
            <button
              onClick={() => {
                setBioEditMode(true)
                setEditedBio(user?.biographie ?? "")
              }}
              className="absolute top-2 right-2 p-1 hover:bg-[#415E6F] rounded cursor-pointer"
              title="Modifier la biographie"
            >
              <EditIcon className="w-4 h-4 text-black" />
            </button>
          )}

          {bioEditMode ? (
            <>
              <textarea
                value={editedBio}
                onChange={e => setEditedBio(e.target.value)}
                className="w-full h-full p-2 rounded bg-[#FAC27D] text-black focus:outline-black resize-none"
                rows={4}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setBioEditMode(false)
                    setEditedBio(user?.biographie ?? "")
                  }}
                  className="px-3 py-1 bg-[#5B3E29] text-white rounded cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  onClick={async () => {
                    try {
                      await updateBiography(editedBio)
                      setBioEditMode(false)
                      if (user) {
                        user.biographie = editedBio
                      }
                    } catch (error) {
                      console.error("Erreur lors de la mise à jour de la bio :", error)
                    }
                  }}
                  className="px-3 py-1 bg-[#A96A3D] text-white rounded cursor-pointer"
                >
                  Sauvegarder
                </button>
              </div>
            </>
          ) : (
            <div className="cursor-default whitespace-pre-wrap break-words font-lilita pt-4 text-[#415E6F]">
              {user?.biographie ?? "Cliquez sur le crayon pour ajouter une biographie"}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  )
}
