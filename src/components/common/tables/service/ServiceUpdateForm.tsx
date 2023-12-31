"use client";
import Input from "@/components/common/Input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { serviceSchema } from "@/lib/validations/service";
import { IService, serviceService } from "@/services/serviceService";
import { subCategoryService } from "@/services/subCategoryService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectInput from "../../selectInput";

interface UpdateServiceProps {
  services: IService;
  workId: number;
  handleClose: () => void; // Definindo a propriedade onCloseModal
}

export default function UpdateService({
  services,
  workId,
  handleClose,
}: UpdateServiceProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

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

  const [service, setService] = useState(services);

  // 1. Define a schema zod.

  type FormValues = z.infer<typeof serviceSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      serviceDescription: service?.serviceDescription,
      status: service?.status,
      unit: service?.unit,
      subcategoryId: service?.subcategoryId,
      totalAmount: service?.totalAmount,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof serviceSchema>) => {
      return serviceService.update(workId, service?.id, data);
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
        title: "Equipe registrada.",
        description: `${validatedData.serviceDescription} foi atualizado com sucesso`,
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

  // useEffect(() => {
  //   if (service) {
  //     form.setValue("serviceDescription", service.serviceDescription);
  //     form.setValue("status", service.status);
  //     form.setValue("unit", service.unit);
  //     form.setValue("totalAmount", service.totalAmount);
  //     form.setValue("subcategoryId", service.subcategoryId || "");
  //   }
  // }, [form, service]);

  // async function onSubmit(data: z.infer<typeof serviceSchema>) {
  //   setIsSubmitting(true);

  //   try {
  //     serviceSchema.parse(data); // Validar os valores antes de chamar a API

  //     if (!workId) {
  //       throw new Error("WorkId not provided");
  //     }

  //     if (!serviceId) {
  //       throw new Error("WorkId not provided");
  //     }

  //     const res = await serviceService.update(workId, service?.id, data);

  //     const successMessage = `${service?.serviceDescription} foi registrado com sucesso`;

  //     if (res === 200) {
  //       toast({
  //         variant: "success",
  //         title: "Serviço Atualizado.",
  //         description: successMessage,
  //       });
  //       handleClose(); // Chama a função onCloseModal para atualizar os serviços após fechar o modal
  //     } else {
  //       throw new Error("Houve um problema ao registrar o serviço.");
  //     }
  //   } catch (error) {
  //     console.error("Erro durante o envio do formulário:", error);
  //     toast({
  //       variant: "destructive",
  //       title: "Erro ao enviar formulário.",
  //       description: "Houve um problema ao enviar o formulário.",
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // }

  return (
    <>
      <div className="flex flex-col gap-9 rounded-sm bg-card sm:grid-cols-2">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-around gap-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
              <Input
                placeholder="Descrição do Serviço"
                type="text"
                value={form.watch("serviceDescription")}
                {...form.register("serviceDescription")} // Registrando o campo com react-hook-form
                error={form.formState.errors.serviceDescription}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2  lg:grid-cols-3">
              <Input
                placeholder="Unidade de Medida"
                type="text"
                value={form.watch("unit")}
                {...form.register("unit")} // Registrando o campo com react-hook-form
                error={form.formState.errors.unit}
              />{" "}
              <Input
                placeholder="Quantitade Total"
                type="text"
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
              <SelectInput
                placeholder="Subcategory"
                value={form.watch("subcategoryId")}
                {...form.register("subcategoryId")}
                error={form.formState.errors.subcategoryId}
                options={subCategories.map(({ id, name }) => ({
                  value: id,
                  label: name,
                }))}
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
