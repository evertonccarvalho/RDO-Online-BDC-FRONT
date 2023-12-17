"use client";
import Input from "@/components/common/form/Input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { serviceSchema } from "@/lib/validations/service";
import { categoryService } from "@/services/categoryService";
import { serviceService } from "@/services/serviceService";
import { subCategoryService } from "@/services/subCategoryService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectInput from "./selectInput";
export default function CreateNewService({
  workId,
}: {
  workId: number | undefined;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  async function onSubmit(data: z.infer<typeof serviceSchema>) {
    setIsSubmitting(true);

    try {
      serviceSchema.parse(data); // Validar os valores antes de chamar a API

      if (!workId) {
        throw new Error("WorkId not provided");
      }

      const response = await serviceService.create(+workId, data);

      const successMessage = `${data.serviceDescription} foi registrado com sucesso`;

      if (response.status === 201) {
        toast({
          variant: "success",
          title: "Serviço registrado.",
          description: successMessage,
        });
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
