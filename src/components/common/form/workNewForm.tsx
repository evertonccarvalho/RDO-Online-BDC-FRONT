"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { workSchema } from "@/lib/validations/work";
import { workService } from "@/services/workService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "./Input";

interface CreateNewWorkProps {
  onCloseModal: () => Promise<void>; // Definindo a propriedade onCloseModal
}

export default function CreateNewWork({ onCloseModal }: CreateNewWorkProps) {
  const { toast } = useToast();
  const router = useRouter();

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

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof workSchema>) {
    try {
      workSchema.parse(data); // Validar os valores antes de chamar a API

      const res = await workService.create(data);

      if (res) {
        toast({
          variant: "success",
          title: "Obra registrada.",
          description: `${data.workDescription} foi registrada com sucesso`,
        });
        router.push("/obras");
        onCloseModal();
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao registrar obra.",
          description: "Ocorreu um erro ao tentar registrar OBRA!.",
        });
      }
    } catch (error) {
      console.error("Erro na validação:", error);
      // Lógica para lidar com o erro de validação, se necessário
      // Por exemplo, exibir uma mensagem para o usuário informando que houve um erro nos dados fornecidos
    }
  }

  // ✅ This will be type-safe and validated.

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
              <Button className="" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
