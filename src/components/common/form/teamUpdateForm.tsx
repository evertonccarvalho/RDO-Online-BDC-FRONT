"use client";
import Input from "@/components/common/form/Input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { TeamSchema, teamSchema } from "@/lib/validations/team";
import { teamService } from "@/services/teamService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectInput from "./selectInput";
export default function UpdateTeam({
  workId,
  teamId,
}: {
  workId: number | undefined;
  teamId: number | undefined;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [team, setService] = useState<TeamSchema | null>(null);

  async function getTeam(
    workId: number | undefined,
    teamId: number | undefined,
  ): Promise<void> {
    try {
      if (!workId) {
        throw new Error("WorkId not provided");
      }

      if (!teamId) {
        throw new Error("WorkId not provided");
      }

      const data = await teamService.getById(teamId, workId);
      setService(data);
    } catch (error) {
      console.log("Error fetching team:", error);
    }
  }

  useEffect(() => {
    getTeam(teamId, workId);
  }, [teamId, workId]);

  type FormValues = z.infer<typeof teamSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      descricaoEquipe: "",
      status: "",
      empresaContratada: "",
    },
  });

  useEffect(() => {
    if (team) {
      form.setValue("descricaoEquipe", team.descricaoEquipe);
      form.setValue("status", team.status);
      form.setValue("empresaContratada", team.empresaContratada);
    }
  }, [form, team]);

  async function onSubmit(data: z.infer<typeof teamSchema>) {
    setIsSubmitting(true);

    try {
      teamSchema.parse(data); // Validar os valores antes de chamar a API

      if (!workId) {
        throw new Error("WorkId not provided");
      }

      if (!teamId) {
        throw new Error("WorkId not provided");
      }

      const res = await teamService.update(+teamId, +workId, data);

      const successMessage = `${data.descricaoEquipe} foi registrado com sucesso`;

      console.log(res);
      if (res === 200) {
        toast({
          variant: "success",
          title: "Equipe registrada.",
          description: successMessage,
        });
        router.push("/obras");
      } else {
        throw new Error("Houve um problema ao registrar a equipe.");
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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
              <Input
                placeholder="Descrição do Serviço"
                type="text"
                value={form.watch("descricaoEquipe")}
                {...form.register("descricaoEquipe")} // Registrando o campo com react-hook-form
                error={form.formState.errors.descricaoEquipe}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2  lg:grid-cols-3">
              <Input
                placeholder="UNIT????"
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
              Atualizar Serviço
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
