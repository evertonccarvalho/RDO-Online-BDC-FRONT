import { ServiceSchema } from "@/lib/validations/service";
import { serviceService } from "@/services/serviceService";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { TableTeam } from "./TableTeam";

export function TableListTeam() {
  const pathname = usePathname();
  const workId = pathname.split("/").pop();

  if (!workId) {
    throw new Error("WorkId not provided");
  }

  const { data, error } = useSWR("/", () => serviceService.fetchAll(+workId));

  if (error) return error;
  if (!data) {
    return <Loader />;
  }

  return (
    <div className="flex w-full min-w-[400px] ">
      <table className="text-Foreground w-full rounded bg-card px-6 py-4">
        <thead>
          <tr className="grid grid-cols-6 gap-4 rounded bg-gray-900 p-3 text-center text-xs">
            <th className="text-center">Id</th>
            <th className="text-center">Descrição</th>
            <th className="text-center">Unit</th>
            <th className="text-center">Status</th>
            <th className="text-center">Sub Categoria</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((service: ServiceSchema, index: number) => (
            <TableTeam
              key={index}
              id={service.id}
              description={service.serviceDescription}
              status={service.status}
              unit={service.unit}
              subCategory={service.subcategoryId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
