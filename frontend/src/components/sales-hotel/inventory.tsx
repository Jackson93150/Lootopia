"use client"

import type { User } from "@/app/types/user"
import PageContainer from "@/components/container/page-container"
import OwnArtefacts from "../inventory/own-artefacts"
import AppModal from "../ui/AppModal"

type InventoryProps = {
  user: User | null
  id: string | null
  showModal: boolean
  onClose: () => void
}

export default function Inventory({ user, id, showModal, onClose }: InventoryProps) {
  return (
    <AppModal modalIsOpen={showModal} closeModal={onClose}>
      <PageContainer color="grey" size="sm">
        <div className="mx-12 my-4 w-[70vw] h-[70vh] gap-8 flex flex-col">
          <OwnArtefacts user={user} id={id} onClose={onClose} />
        </div>
      </PageContainer>
    </AppModal>
  )
}
