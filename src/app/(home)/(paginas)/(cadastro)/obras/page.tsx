"use client";
import Loader from "@/components/common/Loader/page";
import ModalComponent from "@/components/common/Modal";
import WorkAndTablesCard from "@/components/common/cards/workAndTablesCard";
import CreateNewWork from "@/components/common/form/workNewForm";
import { workService } from "@/services/workService";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import useSWR, { mutate } from "swr";
const ObrasPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: obrasData, error: obrasError } = useSWR(
    "/obras",
    workService.fetchAll,
  );

  if (obrasError) return obrasError;
  if (!obrasData) {
    return <Loader />;
  }
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmitModal = async (): Promise<void> => {
    setShowModal(false);
    try {
      const fetchedObrasData = await workService.fetchAll();
      mutate("/obras", fetchedObrasData);
    } catch (error) {
      console.log("Failed to fetch", error);
    }
  };

  return (
    <>
      <div className="flex flex-row flex-wrap gap-4">
        <div>
          <ModalComponent
            isOpen={showModal}
            onClose={handleSubmitModal}
            modalName="Nova Obra"
            modalContent={<CreateNewWork onCloseModal={handleSubmitModal} />}
          />
          <button
            className="flex h-full max-w-fit items-center text-sm text-primary"
            onClick={toggleModal}
          >
            <PlusIcon className="h-4 w-4" />
            <span className="hidden md:block">Nova Obra </span>
          </button>
        </div>
        {obrasData.map((obra: any) => (
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
            handleSubmitModal={handleSubmitModal}
          />
        ))}
      </div>
    </>
  );
};

export default ObrasPage;
