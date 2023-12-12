import Link from "next/link";
import React, { useState } from "react";
import ModalComponent from "./Modal";
import CreateNewService from "./form/serviceNewForm";

interface CardProps {
  icon: React.ElementType;
  viewIconLink: React.ElementType;
  newIconLink: React.ElementType;
  amount: string;
  description: string;
  viewLink: string;
  newLink: string;
  workId: number;
}

const Card: React.FC<CardProps> = ({
  icon: IconComponent,
  viewIconLink: ViewIconLink,
  newIconLink: NewIconLink,
  viewLink,
  newLink,
  workId,
  amount,
}: CardProps) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="border-collapse rounded-md border border-primary bg-card px-7 py-6 shadow-md">
      <div className="flex justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-background">
          {IconComponent && <IconComponent />}
        </div>
        {/* Componente ModalComponent */}
        <ModalComponent
          isOpen={showModal}
          onClose={handleCloseModal}
          modalName="Novo Serviço"
          modalContent={<CreateNewService workId={workId} />}
        />
        <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary text-background">
          <div>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-background"
              onClick={toggleModal}
            >
              <NewIconLink />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="flex items-center gap-2">
          <h4 className="text-title-md font-bold text-foreground">{amount}</h4>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-background">
            <Link href={viewLink}>{ViewIconLink && <ViewIconLink />}</Link>
          </div>
        </div>

        <span className="text-meta-3 flex items-center gap-1 text-sm font-medium">
          {/* {percentage} */}
        </span>
      </div>
    </div>
  );
};

export default Card;
