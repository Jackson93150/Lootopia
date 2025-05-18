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
    border: "rgba(0, 0, 0, 0)",
    backgroundColor: "rgba(0, 0, 0, 0)",
    backgroundImage: "url('/images/modal.png')",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    zIndex: 40,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 40,
  },
}

export default function AppModal({ modalIsOpen, closeModal, styles = {}, children }: ModalProps) {
  const mergedStyles = {
    content: {
      ...defaultStyle.content,
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      ...(styles as any)?.content,
    },
    overlay: {
      ...defaultStyle.overlay,
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      ...(styles as any)?.overlay,
    },
  }

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={mergedStyles} ariaHideApp={false}>
      <div className="font-lilita">{children}</div>
    </Modal>
  )
}
