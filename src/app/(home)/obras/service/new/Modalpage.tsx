import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalContent: React.ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  modalContent,
}) => {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* Conteúdo do seu modal que vem das props */}
            {modalContent}
            <button onClick={onClose}>Fechar Modal</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalComponent;
