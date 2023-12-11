"use client";
import VoltarButton from "@/app/(home)/components/VoltarButton";

import { useToast } from "@/components/ui/use-toast";
import { ServiceSchema } from "@/lib/validations/service";
import { serviceService } from "@/services/serviceService";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function ServicePage() {
  const { toast } = useToast();
  const pathname = usePathname();
  const workId = pathname.split("/").pop();
  const [services, setServices] = useState<ServiceSchema[] | null>(null);
  const router = useRouter();

  async function getServicesByWorkId(
    workId: string | string[] | undefined,
  ): Promise<void> {
    try {
      if (workId === undefined) {
        throw new Error("Work ID not provided.");
      }

      const data = await serviceService.fetchAll(+workId);
      setServices(data);
    } catch (error) {
      console.log("Error fetching services:", error);
    }
  }

  useEffect(() => {
    getServicesByWorkId(workId);
  }, [workId]);

  return (
    <>
      <VoltarButton href="/obras" />
      <div className="flex flex-col gap-9 rounded-sm bg-card p-5 sm:grid-cols-2">
        <div className="flex flex-col gap-9 rounded-sm bg-card p-5 sm:grid-cols-2">
          {services?.map((service: ServiceSchema) => (
            <div key={service.id}>
              <p>Service ID: {service.id}</p>
              <p>Service Description: {service.serviceDescription}</p>
              {/* Outras informações do serviço */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
