"use client";
import Input from "@/components/common/form/Input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { categorySchema } from "@/lib/validations/category";
import { categoryService } from "@/services/categoryService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectInput from "./selectInput";
export default function CreateNewCategory({
  workId,
}: {
  workId: number | undefined;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  type FormValues = z.infer<typeof categorySchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      status: "",
    },
  });

  async function onSubmit(data: z.infer<typeof categorySchema>) {
    setIsSubmitting(true);

    try {
      categorySchema.parse(data); // Validar os valores antes de chamar a API

      if (!workId) {
        throw new Error("WorkId not provided");
      }

      const { status } = await categoryService.create(data);

      const successMessage = `${data.name} foi registrado com sucesso`;

      if (status === 201) {
        toast({
          variant: "success",
          title: "Serviço registrado.",
          description: successMessage,
        });
        router.push("/obras");
      } else {
        throw new Error("Houve um problema ao registrar o categoria.");
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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2"></div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2  lg:grid-cols-1">
              <Input
                placeholder="Nome da Categoria"
                type="text"
                value={form.watch("name")}
                {...form.register("name")} // Registrando o campo com react-hook-form
                error={form.formState.errors.name}
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
              Criar Categoria
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
