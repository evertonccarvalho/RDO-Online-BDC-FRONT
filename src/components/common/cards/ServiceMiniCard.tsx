import Link from "next/link";
import React, { useState } from "react";
import ModalComponent from "../Modal";
import CreateNewService from "../form/serviceNewForm";

interface CardProps {
  icon: React.ElementType;
  viewIconLink: React.ElementType;
  newIconLink: React.ElementType;
  amount: string;
  description: string;
  viewLink: string;
  workId: number;
}

const ServiceCard: React.FC<CardProps> = ({
  icon: IconComponent,
  viewIconLink: ViewIconLink,
  newIconLink: NewIconLink,
  viewLink,
  workId,
  description,
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
        <div className="flex h-10 w-10 rounded-full text-primary hover:bg-primary hover:text-background">
          <button
            className="flex h-full w-full items-center justify-center"
            onClick={toggleModal}
          >
            <NewIconLink />
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="flex items-center gap-2">
          <div>
            <span className="text-meta-3 gap-1 text-sm font-medium">
              {description}
            </span>
            <h4 className="text-title-md font-bold text-foreground">
              {amount}
            </h4>
          </div>
          <div className="flex h-10 w-10 rounded-full text-primary hover:bg-primary hover:text-background">
            <Link
              className="flex h-full w-full items-center justify-center"
              href={viewLink}
            >
              {ViewIconLink && <ViewIconLink />}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
