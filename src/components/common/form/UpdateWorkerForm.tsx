"use client";
import VoltarButton from "@/app/(home)/components/VoltarButton";
import ProfileHeader from "@/app/(home)/currentuser/[id]/profileHeader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useCover from "@/images/cover.png";
import userAvatar from "@/images/user.png";
import { workSchema } from "@/lib/validations/work";
import { IWork, workService } from "@/services/workService";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "./Input";
interface UpdateWorkProps {
  workId: number | undefined;
  onSubmitModal: () => Promise<void>; // Defina corretamente a função para retornar Promise<void>}
}
export default function UpdateWorker({
  workId,
  onSubmitModal,
}: UpdateWorkProps) {
  const { toast } = useToast();
  const [work, setWork] = useState<IWork | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function getWork(workId: number | undefined): Promise<void> {
    try {
      if (workId === undefined) {
        throw new Error("ID do usuário não fornecido.");
      }

      const data = await workService.getById(workId);
      setWork(data);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  }

  useEffect(() => {
    getWork(workId);
  }, [workId]);

  // 1. Define a schema zod.

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

  useEffect(() => {
    if (work) {
      form.setValue("company", work.company);
      form.setValue("workDescription", work.workDescription);
      form.setValue("nameResponsible", work.nameResponsible);
      form.setValue("phoneContact", work.phoneContact);
      form.setValue("address", work.address);
      form.setValue("active", work.active);
    }
  }, [form, work]);

  async function onSubmit(data: z.infer<typeof workSchema>) {
    setIsSubmitting(true);

    try {
      workSchema.parse(data); // Validar os valores antes de chamar a API

      if (!workId) {
        throw new Error("WorkId not provided");
      }

      const res = await workService.update(work?.id || "", data);

      const successMessage = `${work?.workDescription} foi atualizado com sucesso`;

      if (res === 200) {
        toast({
          variant: "success",
          title: "Obra registrado.",
          description: successMessage,
        });
        onSubmitModal();
        // router.push("/obras");
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
                  {...form.register("company")} // Registrando o campo com react-hook-form
                  error={form.formState.errors.company}
                />{" "}
                <Input
                  placeholder="Descrição"
                  type="text"
                  value={form.watch("workDescription")}
                  {...form.register("workDescription")} // Registrando o campo com react-hook-form
                  error={form.formState.errors.workDescription}
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2  lg:grid-cols-4">
                <Input
                  placeholder="Responsavel"
                  type="text"
                  value={form.watch("nameResponsible")}
                  {...form.register("nameResponsible")} // Registrando o campo com react-hook-form
                  error={form.formState.errors.nameResponsible}
                />{" "}
                <Input
                  placeholder="Endereço"
                  type="text"
                  value={form.watch("address")}
                  {...form.register("address")} // Registrando o campo com react-hook-form
                  error={form.formState.errors.address}
                />{" "}
                <Input
                  placeholder="Telefone"
                  maxLength={14}
                  data-mask="[-](00) 0 0000-0000"
                  type="text"
                  value={form.watch("phoneContact")}
                  {...form.register("phoneContact")} // Registrando o campo com react-hook-form
                  error={form.formState.errors.phoneContact}
                />
                <div className="flex items-center gap-2 text-sm">
                  <label className="flex gap-2 text-sm">Ativa?</label>
                  <input
                    className="h-6 w-6 cursor-pointer accent-primary"
                    checked={form.watch("active" || false)}
                    {...form.register("active")} // Registrando o campo com react-hook-form
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
