import UserOne from "@/images/user.png";
import {
  ArrowDown,
  EyeIcon,
  PenBoxIcon,
  PlusIcon,
  WorkflowIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ModalComponent from "./Modal";
import Card from "./ServiceMiniCard";
import UpdateWorker from "./form/UpdateWorkerForm";

interface WorkCardProps {
  workDescription: string;
  company: string;
  nameResponsible: string;
  phoneContact: string;
  address: string;
  logoUrl: string;
  active: Boolean;
  createdAt?: Date;
  id: number;
  count: string;
}

export default function WorkCard({
  workDescription,
  company,
  nameResponsible,
  address,
  phoneContact,
  logoUrl,
  active,
  createdAt,
  id,
  count,
}: WorkCardProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex w-full">
        <div className="w-full rounded-lg bg-card shadow-sm">
          <div className="relative">
            <div className="relative rounded-t-lg bg-cover p-6">
              <div className="flex justify-between">
                <div className="flex flex-col items-start gap-2 font-bold text-foreground">
                  <p className="w-full rounded-full ">{workDescription}</p>{" "}
                  <p className="w-36 rounded-full bg-primary text-center">
                    Status
                  </p>
                </div>
                <div>
                  <button
                    className={`card-header ${isOpen ? "active" : ""}`}
                    onClick={toggleCard}
                  >
                    <ArrowDown />
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
                      modalName="Atualizar Serviço"
                      modalContent={<UpdateWorker workId={id} />}
                    />
                    {/* <div className="flex h-10 w-10 rounded-full text-primary hover:bg-primary hover:text-background">
                      {id && (
                        <Link
                          className="flex h-full w-full items-center justify-center"
                          href={`/obras/${id}`}
                        >
                          <PenBoxIcon />
                        </Link>
                      )}
                    </div> */}
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
                <div className="2xl:gap-7.5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
                  <Card
                    icon={WorkflowIcon}
                    amount={`${count}`}
                    description="Total de Serviços"
                    viewLink={`/obras/service/read/${id}`}
                    viewIconLink={EyeIcon}
                    newLink={`/obras/service/new/${id}`}
                    newIconLink={PlusIcon}
                    workId={id}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
