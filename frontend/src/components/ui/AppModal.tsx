import Modal from "react-modal"

type ModalProps = {
  modalIsOpen: boolean
  closeModal: () => void
  styles?: object
  children: React.ReactNode
}

const defaultStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "4px solid #5B3E29",
    backgroundImage: "linear-gradient(to bottom right, #FAC27D, #f5c249)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 50,
  },
}

export default function AppModal({ modalIsOpen, closeModal, styles = {}, children }: ModalProps) {
  const mergedStyles = {
    content: {
      ...defaultStyle.content,
      ...(styles as any)?.content,
    },
    overlay: {
      ...defaultStyle.overlay,
      ...(styles as any)?.overlay,
    },
  }

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={mergedStyles} ariaHideApp={false}>
      <div className="font-lilita">{children}</div>
    </Modal>
  )
}
