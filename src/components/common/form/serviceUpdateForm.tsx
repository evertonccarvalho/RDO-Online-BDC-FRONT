"use client";
import Input from "@/components/common/form/Input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ServiceSchema, serviceSchema } from "@/lib/validations/service";
import { serviceService } from "@/services/serviceService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
export default function UpdateService({
  workId,
  serviceId,
}: {
  workId: number | undefined;
  serviceId: number | undefined;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [service, setService] = useState<ServiceSchema | null>(null);

  async function getService(
    workId: number | undefined,
    serviceId: number | undefined,
  ): Promise<void> {
    try {
      if (!workId) {
        throw new Error("WorkId not provided");
      }

      if (!serviceId) {
        throw new Error("WorkId not provided");
      }

      const data = await serviceService.getById(serviceId, workId);
      setService(data);
    } catch (error) {
      console.log("Error fetching service:", error);
    }
  }

  useEffect(() => {
    getService(serviceId, workId);
  }, [serviceId, workId]);

  type FormValues = z.infer<typeof serviceSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      serviceDescription: "",
      status: "",
      unit: "",
      subcategoryId: "",
    },
  });

  useEffect(() => {
    if (service) {
      form.setValue("serviceDescription", service.serviceDescription);
      form.setValue("status", service.status);
      form.setValue("unit", service.unit);
      form.setValue("subcategoryId", service.subcategoryId || "");
    }
  }, [form, service]);

  async function onSubmit(data: z.infer<typeof serviceSchema>) {
    setIsSubmitting(true);

    try {
      serviceSchema.parse(data); // Validar os valores antes de chamar a API

      if (!workId) {
        throw new Error("WorkId not provided");
      }

      if (!serviceId) {
        throw new Error("WorkId not provided");
      }

      const res = await serviceService.update(+serviceId, +workId, data);

      const successMessage = `${data.serviceDescription} foi registrado com sucesso`;

      if (res === 201) {
        toast({
          variant: "success",
          title: "Serviço registrado.",
          description: successMessage,
        });
        router.push("/obras");
      } else {
        throw new Error("Houve um problema ao registrar o serviço.");
      }
    } catch (error) {
      console.error("Erro durante o envio do formulário:", error);
      toast({
        variant: "destructive",
        title: "Erro ao enviar formulário.",
        description: "Houve um problema ao enviar o formulário.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-9 rounded-sm bg-card sm:grid-cols-2">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-around gap-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                placeholder="Descrição do Serviço"
                type="text"
                value={form.watch("serviceDescription")}
                {...form.register("serviceDescription")} // Registrando o campo com react-hook-form
                error={form.formState.errors.serviceDescription}
              />

              <Input
                placeholder="Status"
                type="text"
                value={form.watch("status")}
                {...form.register("status")} // Registrando o campo com react-hook-form
                error={form.formState.errors.status}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2  lg:grid-cols-4">
              <Input
                placeholder="UNIT????"
                type="text"
                value={form.watch("unit")}
                {...form.register("unit")} // Registrando o campo com react-hook-form
                error={form.formState.errors.unit}
              />{" "}
              <Input
                placeholder="SubCategoria????"
                type="number"
                value={form.watch("subcategoryId")}
                {...form.register("subcategoryId")} // Registrando o campo com react-hook-form
                error={form.formState.errors.subcategoryId}
              />
            </div>
            <Button disabled={isSubmitting} type="submit">
              Atualizar Serviço
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
