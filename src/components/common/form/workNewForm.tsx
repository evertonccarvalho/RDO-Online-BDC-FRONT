"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { workSchema } from "@/lib/validations/work";
import { workService } from "@/services/workService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "./Input";

interface CreateNewWorkProps {
  handleClose: () => void; // Definindo a propriedade onCloseModal
}

export default function CreateNewWork({ handleClose }: CreateNewWorkProps) {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Define a schema zod.
  type FormValues = z.infer<typeof workSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(workSchema),
    defaultValues: {
      company: "",
      workDescription: "",
      nameResponsible: "",
      address: "",
      phoneContact: "",
      active: false,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof workSchema>) => {
      return workService.create(data);
    },
  });

  const onSubmit = async (data: z.infer<typeof workSchema>) => {
    setIsSubmitting(true);

    try {
      const validatedData = workSchema.parse(data);

      await mutation.mutateAsync(validatedData);
      queryClient.invalidateQueries({ queryKey: ["obras"] });
      handleClose();
      toast({
        variant: "success",
        title: "Obra registrada.",
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
      <div className="flex flex-col gap-9 rounded-sm bg-card p-5 sm:grid-cols-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
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
                  type="text"
                  value={form.watch("phoneContact")}
                  maxLength={14}
                  data-mask="[-](00) 0 0000-0000"
                  {...form.register("phoneContact")} // Registrando o campo com react-hook-form
                  error={form.formState.errors.phoneContact}
                />{" "}
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
                Criar Obra
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
