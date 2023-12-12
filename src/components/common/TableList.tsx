import { deleteService } from "@/lib/userUtils";
import { PenBoxIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DeleteItem from "./delete/DeleteItem";

interface orderSingleProps {
  id: number;
  description: string;
  status: string;
  unit: string;
  subCategory?: string | undefined;
  work?: string | undefined;
}

export function Table({ ...props }: orderSingleProps) {
  const pathname = usePathname();
  const workId = pathname.split("/").pop();

  if (!workId) {
    throw new Error("WorkId not provided");
  }

  let statusColorClass = "";

  // Determinando a cor com base no texto do status
  if (props.status === "Ativo") {
    statusColorClass = "bg-green-900 px-2 py-1 text-green-500"; // Status "Ativo" - cor verde
  } else if (props.status === "Desativado") {
    statusColorClass = "bg-red-900 text-red-500"; // Status "Desativado" - cor vermelha
  } else {
    statusColorClass = "text-gray-500"; // Outros status - cor padrão (cinza)
  }

  return (
    <div className="group grid w-full grid-cols-[95px_minmax(20%,_1fr)_minmax(110px,_1fr)_1fr_1fr_160px] border-b-[1px] border-gray-900 p-3 text-center text-sm text-foreground">
      <span className="text-left text-primary transition-colors group-hover:text-primary">
        {"#" + props.id}
      </span>
      <span className="text-left">{props.description}</span>
      <span className="text-left">{props.unit}</span>
      <div className="">
        {/* <span className="rounded bg-green-900 px-2 py-1 text-green-500"> */}
        <span className={`rounded px-2 py-1 ${statusColorClass}`}>
          {props.status}
        </span>
      </div>
      <span className="">{props.subCategory}</span>
      <div className="flex items-center justify-center gap-2">
        <div>
          <DeleteItem
            itemName={props.description}
            deleteFunction={() => deleteService(props.id, +workId)}
          />
        </div>
        <div className="flex h-10 w-10 text-primary  hover:bg-primary hover:text-background">
          {props.id && (
            <Link
              className="flex h-full w-full cursor-pointer items-center justify-center"
              href={`/obras/service/${workId}/edit/${props.id}`}
            >
              <PenBoxIcon className="h-4 w-4 " />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
