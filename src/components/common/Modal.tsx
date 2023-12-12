import { XIcon } from "lucide-react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalContent: React.ReactNode;
  modalName: string;
}

const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  modalName,
  modalContent,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-70 outline-none focus:outline-none">
          <div className=" relative mx-auto my-6 w-auto max-w-3xl bg-card">
            <div className="relative flex flex-col  p-6">
              <div className="flex items-center justify-between">
                <p>{modalName}</p>
                <div className="flex h-11 w-11 rounded-full text-primary hover:bg-primary hover:text-background">
                  <button
                    className="flex h-full w-full items-center justify-center"
                    onClick={onClose}
                  >
                    <XIcon />
                  </button>
                </div>
              </div>
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalComponent;
