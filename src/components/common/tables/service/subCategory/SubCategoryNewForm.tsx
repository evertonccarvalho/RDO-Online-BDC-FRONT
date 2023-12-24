"use client";
import Input from "@/components/common/Input";
import SelectInput from "@/components/common/selectInput";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { subCategorySchema } from "@/lib/validations/subCategory";
import { categoryService } from "@/services/categoryService";
import { subCategoryService } from "@/services/subCategoryService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
interface UpdateCategoryProps {
  handleClose: () => void; // Definindo a propriedade onCloseModal
}

export default function CreateNewSubCategory({
  handleClose,
}: UpdateCategoryProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function loadCategories() {
      try {
        const fetchedCategories = await categoryService.fetchAll();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    loadCategories();
  }, []);

  type FormValues = z.infer<typeof subCategorySchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: {
      name: "", // Usando value.name para preencher o campo 'name'
      status: "", // Definir valor padrão vindo da propriedade Category
      serviceCategoryId: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof subCategorySchema>) => {
      return subCategoryService.create(data);
    },
  });

  // Função chamada ao submeter o formulário
  const onSubmit = async (data: z.infer<typeof subCategorySchema>) => {
    setIsSubmitting(true);

    try {
      const validatedData = subCategorySchema.parse(data);

      await mutation.mutateAsync(validatedData);
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2  lg:grid-cols-1">
              <SelectInput
                placeholder="Categoria"
                value={categories}
                {...form.register("serviceCategoryId")}
                error={form.formState.errors.serviceCategoryId}
                options={categories.map(({ id, name }) => ({
                  value: id,
                  label: name,
                }))}
              />
              <Input
                placeholder="Nome da Sub Categoria"
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
              Atualizar Serviço
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
