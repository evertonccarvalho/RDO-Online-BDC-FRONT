"use client";
import Input from "@/components/common/form/Input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { categorySchema } from "@/lib/validations/category";
import { categoryService } from "@/services/categoryService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectInput from "../../../form/selectInput";
interface UpdateCategoryProps {
  handleClose: () => void; // Definindo a propriedade onCloseModal
}

export default function CreateNewCategory({
  handleClose,
}: UpdateCategoryProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  type FormValues = z.infer<typeof categorySchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "", // Usando value.name para preencher o campo 'name'
      status: "", // Definir valor padrão vindo da propriedade Category
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof categorySchema>) => {
      return categoryService.create(data);
    },
  });

  // Função chamada ao submeter o formulário
  const onSubmit = async (data: z.infer<typeof categorySchema>) => {
    setIsSubmitting(true);

    try {
      const validatedData = categorySchema.parse(data);

      await mutation.mutateAsync(validatedData);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      handleClose();
      toast({
        variant: "success",
        title: "Equipe registrada.",
        description: `${validatedData.name} foi atualizado com sucesso`,
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
      <div className="flex flex-col gap-9 rounded-sm bg-card sm:grid-cols-2">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-around gap-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
              <Input
                placeholder="Mome da Categoria"
                type="text"
                {...form.register("name")}
                value={form.watch("name")}
                error={form.formState.errors.name}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2  lg:grid-cols-3">
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
