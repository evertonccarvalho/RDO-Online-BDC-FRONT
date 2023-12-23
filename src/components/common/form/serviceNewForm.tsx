"use client";
import Input from "@/components/common/form/Input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { serviceSchema } from "@/lib/validations/service";
import { categoryService } from "@/services/categoryService";
import { serviceService } from "@/services/serviceService";
import { subCategoryService } from "@/services/subCategoryService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectInput from "./selectInput";

interface CreateNewServiceProps {
  workId: number;
  handleClose: () => void; // Definindo a propriedade onCloseModal
}

export default function CreateNewService({
  workId,
  handleClose,
}: CreateNewServiceProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const queryClient = useQueryClient();

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

  useEffect(() => {
    async function loadSubCategories() {
      try {
        const fetchedSubCategories = await subCategoryService.fetchAll();
        setSubCategories(fetchedSubCategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    }
    loadSubCategories();
  }, []);

  const handleCategoryChange = (selectedCategoryId: string) => {
    setSelectedCategory(selectedCategoryId);
  };

  const filteredSubCategories = selectedCategory
    ? subCategories.filter((subCategory) => subCategory === selectedCategory)
    : subCategories;

  // };

  type FormValues = z.infer<typeof serviceSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      serviceDescription: "",
      status: "",
      unit: "",
      subcategoryId: "",
      totalAmount: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof serviceSchema>) => {
      return serviceService.create(workId, data);
    },
    onSuccess: (data) => {
      // Ação a ser realizada em caso de sucesso
      console.log("Mutação bem-sucedida:", data);
      // Aqui você pode fazer qualquer ação necessária após a mutação bem-sucedida
    },
  });

  // Função chamada ao submeter o formulário
  const onSubmit = async (data: z.infer<typeof serviceSchema>) => {
    setIsSubmitting(true);

    try {
      const validatedData = serviceSchema.parse(data);

      await mutation.mutateAsync(validatedData);
      queryClient.invalidateQueries({ queryKey: ["services"] });
      handleClose();
      toast({
        variant: "success",
        title: "Registrado.",
        description: `${validatedData.serviceDescription} foi criado com sucesso`,
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="flex flex-col justify-around gap-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <SelectInput
                placeholder="Category"
                value={categories}
                onChange={(e) => handleCategoryChange(e.target.value)}
                options={categories.map(({ id, name }) => ({
                  value: id,
                  label: name,
                }))}
              />
              <SelectInput
                placeholder="Subcategory"
                value={form.watch("subcategoryId")}
                {...form.register("subcategoryId")}
                error={form.formState.errors.subcategoryId}
                options={filteredSubCategories.map(({ id, name }) => ({
                  value: id,
                  label: name,
                }))}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2  lg:grid-cols-1">
              <Input
                placeholder="Descrição do Serviço"
                type="text"
                value={form.watch("serviceDescription")}
                {...form.register("serviceDescription")} // Registrando o campo com react-hook-form
                error={form.formState.errors.serviceDescription}
              />
              <Input
                placeholder="Unidade de Medida"
                type="text"
                value={form.watch("unit")}
                {...form.register("unit")} // Registrando o campo com react-hook-form
                error={form.formState.errors.unit}
              />{" "}
              <Input
                placeholder="Quantitade Total"
                type="number"
                value={form.watch("totalAmount")}
                {...form.register("totalAmount")} // Registrando o campo com react-hook-form
                error={form.formState.errors.totalAmount}
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
              Criar Serviço
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
