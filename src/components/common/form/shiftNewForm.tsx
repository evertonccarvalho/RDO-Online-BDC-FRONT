"use client";
import Input from "@/components/common/form/Input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { shiftSchema } from "@/lib/validations/shift";
import { shiftService } from "@/services/shiftService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectInput from "./selectInput";
export default function CreateNewShift({
  workId,
}: {
  workId: number | undefined;
}) {
  // const pathname = usePathname();
  // const workId = pathname.split("/").pop();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  type FormValues = z.infer<typeof shiftSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(shiftSchema),
    defaultValues: {
      description: "",
      feasibility: "",
      weatherCondition: "",
      status: "",
      teamId: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof shiftSchema>) {
    setIsSubmitting(true);

    try {
      shiftSchema.parse(data); // Validar os valores antes de chamar a API

      if (!workId) {
        throw new Error("WorkId not provided");
      }

      const { status } = await shiftService.create(+workId, data);

      const successMessage = `${data.description} foi registrado com sucesso`;

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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
              <Input
                placeholder="Descrição do turno"
                type="text"
                value={form.watch("description")}
                {...form.register("description")} // Registrando o campo com react-hook-form
                error={form.formState.errors.description}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2  lg:grid-cols-3">
              <SelectInput
                placeholder="Praticabilidade"
                value={form.watch("feasibility")}
                {...form.register("feasibility")}
                error={form.formState.errors.feasibility}
                options={[
                  { value: "Ensolarado", label: "Ensolarado" },
                  { value: "Nublado", label: "Nublado" },
                  { value: "Chuvoso", label: "Chuvoso" },
                ]}
              />{" "}
              <SelectInput
                placeholder="Clima"
                value={form.watch("weatherCondition")}
                {...form.register("weatherCondition")}
                error={form.formState.errors.weatherCondition}
                options={[
                  { value: "Ensolarado", label: "Ensolarado" },
                  { value: "Nublado", label: "Nublado" },
                  { value: "Chuvoso", label: "Chuvoso" },
                ]}
              />
              <SelectInput
                placeholder="Status"
                value={form.watch("status")}
                {...form.register("status")}
                error={form.formState.errors.status}
                options={[
                  { value: "Ativo", label: "Ativo" },
                  { value: "Inativo", label: "Inativo" },
                ]}
              />{" "}
            </div>
            <Button disabled={isSubmitting} type="submit">
              Criar Turno
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
