"use client";
import ModalComponent from "@/components/common/Modal";
import WorkAndTablesCard from "@/components/common/cards/WorkCardTables";
import UpdateWorker from "@/components/common/form/WorkUpdateForm";
import CreateNewWork from "@/components/common/form/workNewForm";
import { IWork, workService } from "@/services/workService";
import { useQuery } from "@tanstack/react-query";
import { PlusCircleIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

const ObrasPage = () => {
  const { data: obrasData } = useQuery({
    queryKey: ["obras"],
    queryFn: () => workService.fetchAll(),
  });

  const [selectedWork, setSelectedWork] = useState<IWork | null>(null);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="flex flex-row flex-wrap gap-4">
        <div>
          <button
            className="flex h-full max-w-fit  items-center gap-2 text-sm text-primary"
            onClick={toggleModal}
          >
            <span className="hidden md:block">Nova Obra</span>
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        {obrasData?.map((obra: any) => (
          <WorkAndTablesCard
            id={obra.id}
            key={obra.id}
            company={obra.company}
            workDescription={obra.workDescription}
            nameResponsible={obra.nameResponsible}
            address={obra.address}
            logoUrl={obra.logoUrl}
            phoneContact={obra.phoneContact}
            active={obra.active}
            onOpenModal={() => setSelectedWork(obra)}
          />
        ))}
      </div>
      <div>
        {selectedWork && (
          <ModalComponent
            modalName="Editar Obra"
            isOpen={true}
            onClose={() => setSelectedWork(null)}
            modalContent={
              <UpdateWorker
                works={selectedWork}
                handleClose={() => setSelectedWork(null)}
              />
            }
          />
        )}
        <ModalComponent
          isOpen={showModal}
          onClose={handleCloseModal}
          modalName="Nova Obra"
          modalContent={<CreateNewWork handleClose={handleCloseModal} />}
        />
      </div>
    </>
  );
};

export default ObrasPage;
