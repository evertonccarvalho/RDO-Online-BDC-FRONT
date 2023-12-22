import { Button } from "@/components/ui/button";
import { getStringStatusColorClass } from "@/helpers/statusColorClassHelper";
import { deleteService } from "@/lib/userUtils";
import { PenBoxIcon } from "lucide-react";
import DeleteItem from "../../delete/DeleteItem";

interface orderSingleProps {
  id: number;
  description: string;
  status: string;
  unit: string;
  total: string;
  subCategory?: string | undefined;
  work?: string | undefined;
  workId: number;
  active: string;
  onOpenModal: (serviceId: number, workId: number) => void;
}

export function ServiceTableRows({
  workId,
  active,
  onOpenModal,
  ...props
}: orderSingleProps) {
  const statusColorClass = getStringStatusColorClass(active);

  return (
    <>
      <tr className="grid min-w-max grid-cols-7 items-center gap-2 border-b-[1px] border-background p-2 text-center text-xs text-foreground hover:bg-gray-900">
        <td className="text-primary">{"#" + props.id}</td>
        <td>{props.description}</td>
        <td>{props.unit}</td>
        <td>{props.total}</td>
        <td className={`rounded px-2 ${statusColorClass}`}>{props.status}</td>
        <td className="">{props.subCategory}</td>
        <td>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenModal(props.id, +workId)} // Aqui você pode usar 'as number' se 'props.id' for um número
          >
            <PenBoxIcon className="h-4 w-4 text-primary" />
          </Button>
          <DeleteItem
            itemName={props.description}
            deleteFunction={() => deleteService(+workId, props.id)}
          />
        </td>
      </tr>
    </>
  );
}
