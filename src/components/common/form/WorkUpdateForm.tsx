"use client";
import ProfileHeader from "@/app/(home)/currentuser/[id]/profileHeader";
import VoltarButton from "@/components/common/VoltarButton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useCover from "@/images/cover.png";
import userAvatar from "@/images/user.png";
import { workSchema } from "@/lib/validations/work";
import { IWork, workService } from "@/services/workService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../Input";

interface UpdateWorkProps {
  works: IWork;
  handleClose: () => void;
}
export default function UpdateWork({ works, handleClose }: UpdateWorkProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [work, setWork] = useState(works);

  type FormValues = z.infer<typeof workSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(workSchema),
    defaultValues: {
      company: work?.company || "",
      nameResponsible: work?.nameResponsible || "",
      phoneContact: work?.phoneContact || "",
      address: work?.address || "",
      active: work?.active,
      workDescription: work?.workDescription || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof workSchema>) => {
      return workService.update(work?.id || "", data);
    },
  });

  // Função chamada ao submeter o formulário
  const onSubmit = async (data: z.infer<typeof workSchema>) => {
    setIsSubmitting(true);

    try {
      const validatedData = workSchema.parse(data);

      await mutation.mutateAsync(validatedData);
      queryClient.invalidateQueries({ queryKey: ["obras"] });
      handleClose();
      toast({
        variant: "success",
        title: "Equipe registrada.",
        description: `${validatedData.workDescription} foi atualizado com sucesso`,
      });
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
  };

  return (
    <>
      <VoltarButton href="/obras" />
      <div className="flex flex-col gap-9 rounded-sm bg-card p-5 sm:grid-cols-2">
        <ProfileHeader
          coverImageSrc={useCover}
          profileImageSrc={userAvatar}
          username={work?.company}
          role={work?.workDescription}
          email={work?.nameResponsible}
        />
        <div className="flex flex-col gap-9 rounded-sm bg-card p-5 sm:grid-cols-2">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-around gap-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input
                  placeholder="Empresa"
                  type="text"
                  value={form.watch("company")}
                  {...form.register("company")}
                  error={form.formState.errors.company}
                />{" "}
                <Input
                  placeholder="Descrição"
                  type="text"
                  value={form.watch("workDescription")}
                  {...form.register("workDescription")}
                  error={form.formState.errors.workDescription}
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2  lg:grid-cols-4">
                <Input
                  placeholder="Responsavel"
                  type="text"
                  value={form.watch("nameResponsible")}
                  {...form.register("nameResponsible")}
                  error={form.formState.errors.nameResponsible}
                />{" "}
                <Input
                  placeholder="Endereço"
                  type="text"
                  value={form.watch("address")}
                  {...form.register("address")}
                  error={form.formState.errors.address}
                />{" "}
                <Input
                  placeholder="Telefone"
                  maxLength={14}
                  data-mask="[-](00) 0 0000-0000"
                  type="text"
                  value={form.watch("phoneContact")}
                  {...form.register("phoneContact")}
                  error={form.formState.errors.phoneContact}
                />
                <div className="flex items-center gap-2 text-sm">
                  <label className="flex gap-2 text-sm">Ativa?</label>
                  <input
                    className="h-6 w-6 cursor-pointer accent-primary"
                    checked={form.watch("active" || false)}
                    {...form.register("active")}
                    type="checkbox"
                  />
                </div>
              </div>
              <Button disabled={isSubmitting} type="submit">
                Atualizar Obra
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
