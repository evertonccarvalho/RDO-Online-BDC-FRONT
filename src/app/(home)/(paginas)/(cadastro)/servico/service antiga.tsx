"use client";
import Breadcrumb from "@/app/(home)/components/Breadcrumb";
import { columnService } from "@/components/common/tables/service/columnsService";
import { ServiceData } from "@/components/common/tables/service/serviceData";
import { IService, serviceService } from "@/services/serviceService";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Servico() {
  const pathname = usePathname();
  const workId = pathname.split("/").pop();
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
            subcategoryId: "",
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
  }, []);

  return (
    <>
      <div className=" space-y-6 p-2">
        <div>
          <Breadcrumb pageName="Usuários" />
          <p className="text-sm text-muted-foreground">Serviços</p>
        </div>
        <div className="text-Foreground w-full rounded bg-card px-6 py-4">
          <ServiceData columns={columnService} data={serviceData} />
        </div>
      </div>
    </>
  );
}
