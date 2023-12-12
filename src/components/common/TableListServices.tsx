import { ServiceSchema } from "@/lib/validations/service";
import { serviceService } from "@/services/serviceService";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { Table } from "./TableList";

export function TableListServices() {
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
    <div className="text-Foreground rounded bg-card px-6 py-4">
      <h2 className="mb-4 text-lg">Serviços</h2>

      <div className="overflow-x-auto pb-4">
        <div className="flex min-w-[760px] flex-col">
          <div className="text-md grid grid-cols-[95px_minmax(20%,_1fr)_minmax(110px,_1fr)_1fr_1fr_160px] rounded bg-gray-900 p-3 text-center">
            <span className="text-left">Id</span>
            <span className="text-left">Descrição</span>
            <span className="text-left">Unit</span>
            <span className="">Status</span>
            <span className="">Sub Categoria</span>
            <span className="text-center">Ações</span>
          </div>

          {data.map((order: ServiceSchema, index: number) => (
            <Table
              key={index}
              id={order.id}
              description={order.serviceDescription}
              status={order.status}
              unit={order.unit}
              subCategory={order.subcategoryId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
