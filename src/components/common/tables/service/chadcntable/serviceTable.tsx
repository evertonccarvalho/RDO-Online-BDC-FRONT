"use client";
import { columnService } from "@/components/common/tables/service/columnsService";
import { ServiceData } from "@/components/common/tables/service/serviceData";
import { IService, serviceService } from "@/services/serviceService";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  workId: number;
}

export default function ServiceTable({ workId }: Props) {
  const pathname = usePathname();
  // const workId = pathname.split("/").pop();
  const [serviceData, setServiceData] = useState<IService[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!workId) {
        throw new Error("WorkId not provided");
      }
      try {
        const data = await serviceService.fetchAll(+workId);
        setServiceData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Você pode fornecer dados padrão ou retornar um array vazio aqui.
        // Por exemplo:
        setServiceData([
          // Dados padrão caso ocorra um erro na requisição
          {
            id: 1,
            serviceDescription: "",
            status: "",
            unit: "",
            totalAmount: "",
            subcategoryId: 0,
            work: {
              id: 1,
              workDescription: "",
              active: true,
              address: "",
              company: "",
              nameResponsible: "",
              phoneContact: "",
            },
          },
        ]);
      }
    }

    fetchData();
  }, [workId]);

  return (
    <>
      <div className="text-Foreground w-full rounded bg-card py-2">
        <ServiceData columns={columnService} data={serviceData} />
      </div>
    </>
  );
}
