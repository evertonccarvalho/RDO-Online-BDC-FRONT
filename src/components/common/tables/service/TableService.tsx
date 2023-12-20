import { Button } from "@/components/ui/button";
import { deleteService } from "@/lib/userUtils";
import { PenBoxIcon } from "lucide-react";
import { useState } from "react";
import ModalComponent from "../../Modal";
import DeleteItem from "../../delete/DeleteItem";
import UpdateService from "../../form/serviceUpdateForm";

interface orderSingleProps {
  id: number;
  description: string;
  status: string;
  unit: string;
  total: string;
  subCategory?: string | undefined;
  work?: string | undefined;
  workId: number;
}

export function TableService({ workId, ...props }: orderSingleProps) {
  // const pathname = usePathname();
  // const workId = pathname.split("/").pop();

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!workId) {
    throw new Error("WorkId not provided");
  }

  let statusColorClass = "";

  // Determinando a cor com base no texto do status
  if (props.status === "Ativo") {
    statusColorClass = "bg-green-900 px-2 py-1 text-green-500";
  } else if (props.status === "Inativo") {
    statusColorClass = "bg-red-900 text-red-500";
  } else {
    statusColorClass = "text-gray-500";
  }

  return (
    <>
      <ModalComponent
        isOpen={showModal}
        onClose={handleCloseModal}
        modalName="Atualizar Serviço"
        modalContent={<UpdateService workId={+workId} serviceId={props.id} />}
      />
      <tr className="grid min-w-max grid-cols-7 items-center gap-2 border-b-[1px] border-background p-2 text-center text-xs text-foreground hover:bg-gray-900">
        <td className="text-primary">{"#" + props.id}</td>
        <td>{props.description}</td>
        <td>{props.unit}</td>
        <td>{props.total}</td>
        <td className={`rounded px-2 ${statusColorClass}`}>{props.status}</td>
        <td className="">{props.subCategory}</td>
        <td>
          <Button variant="ghost" size="icon" onClick={toggleModal}>
            <PenBoxIcon className="h-4 w-4 text-primary" />
          </Button>
          <DeleteItem
            itemName={props.description}
            deleteFunction={() => deleteService(props.id, +workId)}
          />
        </td>
      </tr>
    </>
  );
}
