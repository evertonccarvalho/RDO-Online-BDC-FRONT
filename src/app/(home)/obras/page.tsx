"use client";
import Breadcrumb from "@/app/(home)/components/Breadcrumb";
import Loader from "@/components/common/Loader/page";
import ModalComponent from "@/components/common/Modal";
import WorkCard from "@/components/common/cards/workCard";
import CreateNewWork from "@/components/common/form/workNewForm";
import { workService } from "@/services/workService";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";
const ObrasPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: obrasData, error: obrasError } = useSWR(
    "/obras",
    workService.fetchAll,
  );
  console.log("Obras Data:", obrasData);
  if (obrasError) return obrasError;
  if (!obrasData) {
    return <Loader />;
  }
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <Breadcrumb pageName="Obras" />
      </div>

      <div className="flex flex-row flex-wrap gap-4">
        <div>
          <ModalComponent
            isOpen={showModal}
            onClose={handleCloseModal}
            modalName="Criar nova obra"
            modalContent={<CreateNewWork />}
          />
          <div className="flex h-10 w-full  text-primary hover:bg-primary hover:text-background">
            <button
              className="flex h-full w-full items-center justify-center p-2"
              onClick={toggleModal}
            >
              Nova Obra <PlusIcon />
            </button>
          </div>
        </div>
        {obrasData.map((obra: any) => (
          <WorkCard
            id={obra.id}
            key={obra.id}
            company={obra.company}
            workDescription={obra.workDescription}
            nameResponsible={obra.nameResponsible}
            address={obra.address}
            logoUrl={obra.logoUrl}
            phoneContact={obra.phoneContact}
            active={obra.active}
            countService={obra.services.length}
            countTeam={obra.Team.length}
            countShift={obra.Shift.length}
          />
        ))}
      </div>
    </>
  );
};

export default ObrasPage;
