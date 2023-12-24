import DeleteItem from "@/components/common/DeleteItem";
import { Button } from "@/components/ui/button";
import { getStringStatusColorClass } from "@/helpers/statusColorClassHelper";
import { deleteService } from "@/lib/userUtils";
import { PenBoxIcon } from "lucide-react";

interface orderSingleProps {
  id: number;
  name: string;
  status: string;
  work?: string | undefined;
  subCategory?: string | undefined;
  workId: number;
  onOpenModal: (id: number) => void;
}

export function SubCategoryTableRows({
  workId,
  onOpenModal,
  ...props
}: orderSingleProps) {
  const statusColorClass = getStringStatusColorClass(props.status);

  return (
    <>
      <tr className="grid min-w-max grid-cols-5 items-center gap-2 border-b-[1px] border-background p-2 text-center text-xs text-foreground hover:bg-gray-900">
        <td className="text-primary">{"#" + props.id}</td>
        <td>{props.name}</td>
        <td className={`rounded px-2 ${statusColorClass}`}>{props.status}</td>
        <td>{props.subCategory}</td>

        <td>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenModal(props.id)} // Aqui você pode usar 'as number' se 'props.id' for um número
          >
            <PenBoxIcon className="h-4 w-4 text-primary" />
          </Button>
          <DeleteItem
            itemName={props.name}
            deleteFunction={() => deleteService(+workId, props.id)}
          />
        </td>
      </tr>
    </>
  );
}
