import Link from "next/link";
import React, { useState } from "react";
import ModalComponent from "../Modal";
import CreateNewCategory from "../form/categoryNewForm";
import CreateNewService from "../form/serviceNewForm";
import CreateNewSubCategory from "../form/subCategoryNewForm";

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
  const [showModalService, setShowModalService] = useState(false);
  const [showModalCategory, setShowModalCategory] = useState(false);
  const [showModalSubCategory, setShowModalSubCategory] = useState(false);

  const toggleModalService = () => {
    setShowModalService(!showModalService);
  };

  const toggleModalCategory = () => {
    setShowModalCategory(!showModalCategory);
  };
  const toggleModalSubCategory = () => {
    setShowModalSubCategory(!showModalSubCategory);
  };

  const handleCloseModalService = () => {
    setShowModalService(false);
  };

  const handleCloseModalCategory = () => {
    setShowModalCategory(false);
  };
  const handleCloseModalSubCategory = () => {
    setShowModalSubCategory(false);
  };

  return (
    <div className="border-collapse rounded-md border border-primary bg-card px-4 py-6 shadow-md">
      <div className="flex justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-background">
          {IconComponent && <IconComponent />}
        </div>
        {/* Componente ModalComponent */}
        <ModalComponent
          isOpen={showModalService}
          onClose={handleCloseModalService}
          modalName="Novo Serviço"
          modalContent={<CreateNewService workId={workId} />}
        />
        <ModalComponent
          isOpen={showModalCategory}
          onClose={handleCloseModalCategory}
          modalName="Nova Categoria"
          modalContent={<CreateNewCategory workId={workId} />}
        />{" "}
        <ModalComponent
          isOpen={showModalSubCategory}
          onClose={handleCloseModalSubCategory}
          modalName="Nova Sub Categoria"
          modalContent={<CreateNewSubCategory workId={workId} />}
        />
        <div className="flex w-full flex-row items-end justify-center gap-2 text-xs">
          <button
            className="flex h-full w-full flex-col items-center"
            onClick={toggleModalService}
          >
            <NewIconLink />
            Serviço
          </button>
          <button
            className="flex h-full w-full flex-col items-center"
            onClick={toggleModalCategory}
          >
            <NewIconLink />
            Categoria
          </button>
          <button
            className="flex h-full w-full flex-col items-center"
            onClick={toggleModalSubCategory}
          >
            <NewIconLink />
            Sub Categoria
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
