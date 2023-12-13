"use client";
import Input from "@/components/common/form/Input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { teamSchema } from "@/lib/validations/team";
import { teamService } from "@/services/teamService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectInput from "./selectInput";
export default function CreateNewTeam({
  workId,
}: {
  workId: number | undefined;
}) {
  // const pathname = usePathname();
  // const workId = pathname.split("/").pop();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  type FormValues = z.infer<typeof teamSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      descricaoEquipe: "",
      status: "",
      empresaContratada: "",
    },
  });

  async function onSubmit(data: z.infer<typeof teamSchema>) {
    setIsSubmitting(true);

    try {
      teamSchema.parse(data); // Validar os valores antes de chamar a API

      if (!workId) {
        throw new Error("WorkId not provided");
      }

      const { status } = await teamService.create(+workId, data);

      const successMessage = `${data.descricaoEquipe} foi registrado com sucesso`;

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
                placeholder="Descrição da Equipe"
                type="text"
                value={form.watch("descricaoEquipe")}
                {...form.register("descricaoEquipe")} // Registrando o campo com react-hook-form
                error={form.formState.errors.descricaoEquipe}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2  lg:grid-cols-3">
              <Input
                placeholder="Empresa Contratada"
                type="text"
                value={form.watch("empresaContratada")}
                {...form.register("empresaContratada")} // Registrando o campo com react-hook-form
                error={form.formState.errors.empresaContratada}
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
              />
            </div>
            <Button disabled={isSubmitting} type="submit">
              Criar Equipe
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
