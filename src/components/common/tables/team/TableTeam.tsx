import { deleteTeam } from "@/lib/userUtils";
import { PenBoxIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import DeleteItem from "../../DeleteItem";
import ModalComponent from "../../Modal";
import UpdateTeam from "../../form/teamUpdateForm";

interface orderSingleProps {
  id: number;
  description: string;
  empresa: string;
  status: string;
  work?: string | undefined;
}

export function TableTeam({ ...props }: orderSingleProps) {
  const pathname = usePathname();
  const workId = pathname.split("/").pop();

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
    statusColorClass = "bg-green-900 px-2 py-1 text-green-500"; // Status "Ativo" - cor verde
  } else if (props.status === "Inativo") {
    statusColorClass = "bg-red-900 text-red-500"; // Status "Desativado" - cor vermelha
  } else {
    statusColorClass = "text-gray-500"; // Outros status - cor padrão (cinza)
  }

  return (
    <tr className="grid w-full grid-cols-5 items-center gap-4 border-b-[1px] border-background p-2 text-center text-xs text-foreground">
      <td className="text-center text-primary ">{"#" + props.id}</td>
      <td className="text-center">{props.description}</td>
      <td className="text-center">{props.empresa}</td>
      <td
        className={`flex items-center justify-center rounded px-2 py-1 ${statusColorClass}`}
      >
        {props.status}
      </td>
      <td className="flex items-center justify-center gap-1">
        <DeleteItem
          itemName={props.description}
          deleteFunction={() => deleteTeam(props.id, +workId)}
        />
        <ModalComponent
          isOpen={showModal}
          onClose={handleCloseModal}
          modalName="Atualizar Serviço"
          modalContent={<UpdateTeam workId={+workId} teamId={props.id} />}
        />
        <div className="flex h-10 w-10 rounded-full text-primary hover:bg-primary hover:text-background">
          <button
            className="flex h-full w-full items-center justify-center"
            onClick={toggleModal}
          >
            <PenBoxIcon />
          </button>
        </div>
      </td>
    </tr>
  );
}
