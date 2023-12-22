import { getStatusColorClass } from "@/helpers/statusColorClassHelper";
import UserOne from "@/images/user.png";
import { ArrowDown, ArrowUp, PenBoxIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ButtonContentSwitcher from "../ButtonContentSwitcher ";
import ModalComponent from "../Modal";
import UpdateWorker from "../form/UpdateWorkerForm";
import { CategoryTable } from "../tables/service/Category/CategoryTable";
import { ServiceTable } from "../tables/service/ServiceTable";
import { TableListSubCategory } from "../tables/service/subCategory/TableListSubCategory";

interface WorkCardProps {
  workDescription: string;
  company: string;
  nameResponsible: string;
  phoneContact: string;
  address: string;
  logoUrl: string;
  active: string;
  id: number;
  handleSubmitModal: () => Promise<void>; // Certifique-se de que esta função está corretamente tipada
}
export default function WorkAndTablesCard({
  workDescription,
  company,
  nameResponsible,
  address,
  phoneContact,
  logoUrl,
  active,
  id,
  handleSubmitModal,
}: WorkCardProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const buttons = [
    { label: "Serviços2", content: <ServiceTable workId={id} /> },
    { label: "Categorias", content: <CategoryTable workId={id} /> },
    { label: "Subcategorias", content: <TableListSubCategory /> },
  ];

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = async () => {
    setShowModal(false);
    try {
      await handleSubmitModal();
    } catch (error) {}
  };

  const statusColorClass = getStatusColorClass(active);

  return (
    <>
      <div className="flex w-full">
        <div className="w-full rounded-lg bg-card shadow-sm">
          <div className="relative">
            <div className="relative rounded-t-lg bg-cover p-6">
              <div className="flex justify-between">
                <div className="flex flex-col items-start gap-2 font-bold text-foreground">
                  <p className="w-full rounded-full">{workDescription}</p>
                  <p
                    className={`flex items-center justify-center rounded px-2 py-1 ${statusColorClass}`}
                  >
                    {active === "true" ? "Ativa" : "Inativa"}
                  </p>
                </div>
                <div>
                  <button
                    className={`card-header ${isOpen ? "active" : ""}`}
                    onClick={toggleCard}
                  >
                    {isOpen ? <ArrowUp /> : <ArrowDown />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="relative p-6">
              <div className=" flex flex-col justify-start gap-4 ">
                <div className="text-2xl font-black leading-none text-primary">
                  {company}
                </div>
                <div className="flex justify-between ">
                  <div className="flex items-center gap-4 ">
                    <div className=" w-12 rounded-full border-2 border-primary">
                      <Image
                        src={logoUrl || UserOne}
                        alt="User"
                        width={100}
                        height={100}
                        quality={80}
                      />
                    </div>
                    <div className="text-xs text-foreground">
                      <p>
                        Resp: <span>{nameResponsible}</span>
                      </p>
                      <p>
                        Contato: <span>{phoneContact}</span>
                      </p>
                      <p>
                        Endereço: <span>{address}</span>
                      </p>
                    </div>
                    <ModalComponent
                      isOpen={showModal}
                      onClose={handleCloseModal}
                      modalName="Atualizar Obra"
                      modalContent={
                        <UpdateWorker
                          workId={id}
                          onSubmitModal={handleCloseModal} // Corrigindo para a propriedade correta
                        />
                      }
                    />
                    <div className="flex h-10 w-10 rounded-full text-primary hover:bg-primary hover:text-background">
                      <button
                        className="flex h-full w-full items-center justify-center"
                        onClick={toggleModal}
                      >
                        <PenBoxIcon />
                      </button>
                    </div>
                  </div>
                </div>
                <ButtonContentSwitcher buttons={buttons} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
