import DeleteItem from "@/components/common/delete/DeleteItem";
import { getStringStatusColorClass } from "@/helpers/statusColorClassHelper";
import { deleteService } from "@/lib/userUtils";
import { PenBoxIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface orderSingleProps {
  id: number;
  name: string;
  status: string;
  work?: string | undefined;
}

export function TableCategory({ ...props }: orderSingleProps) {
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

  const statusColorClass = getStringStatusColorClass(props.status);

  return (
    <tr className="grid w-full grid-cols-4 items-center gap-4 border-b-[1px] border-background p-2 text-center text-xs text-foreground">
      <td className="text-center text-primary ">{"#" + props.id}</td>
      <td className="text-center">{props.name}</td>
      <td
        className={`flex items-center justify-center rounded px-2 py-1 ${statusColorClass}`}
      >
        {props.status}
      </td>
      <td className="flex items-center justify-center gap-1">
        <DeleteItem
          itemName={props.name}
          deleteFunction={() => deleteService(props.id, +workId)}
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
