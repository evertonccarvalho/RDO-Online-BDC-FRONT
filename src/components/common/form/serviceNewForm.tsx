"use client";
import Input from "@/components/common/form/Input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { serviceSchema } from "@/lib/validations/service";
import { serviceService } from "@/services/serviceService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
export default function CreateNewService({
  workId,
}: {
  workId: number | undefined;
}) {
  // const pathname = usePathname();
  // const workId = pathname.split("/").pop();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

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

  async function onSubmit(data: z.infer<typeof serviceSchema>) {
    setIsSubmitting(true);

    try {
      serviceSchema.parse(data); // Validar os valores antes de chamar a API

      if (!workId) {
        throw new Error("WorkId not provided");
      }

      const { status } = await serviceService.create(+workId, data);

      const successMessage = `${data.serviceDescription} foi registrado com sucesso`;

      if (status === 201) {
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
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
              Criar Serviço
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
