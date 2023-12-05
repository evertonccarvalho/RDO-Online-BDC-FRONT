"use client";
import VoltarButton from "@/app/(home)/components/VoltarButton";
import FormInputField from "@/components/common/form/FormInputField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { workSchema } from "@/lib/validations/work";
import { workService } from "@/services/workService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
export default function CreateWork() {
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
      <VoltarButton href="/obra" />
      <div className="flex flex-col gap-9 rounded-sm bg-card p-5 sm:grid-cols-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="flex flex-col justify-around gap-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <FormInputField
                  control={form.control}
                  name="company"
                  label="Empresa"
                  placeholder="Empresa"
                  maxLength={25}
                />
                <FormInputField
                  control={form.control}
                  name="workDescription"
                  label="Descrição"
                  maxLength={25}
                  placeholder="Descrição"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2  lg:grid-cols-4">
                <FormInputField
                  control={form.control}
                  name="nameResponsible"
                  label="Responsavel"
                  maxLength={50}
                  placeholder="Responsavel"
                />
                <FormInputField
                  control={form.control}
                  name="address"
                  label="Endereço"
                  maxLength={50}
                  placeholder="Endereço"
                />
                <FormInputField
                  control={form.control}
                  name="phoneContact"
                  label="Telefone"
                  maxLength={14}
                  data-mask="[-](00) 0 0000-0000"
                  placeholder="(xx) 9xxxx-xxxx"
                />
                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2 text-sm">
                      <FormLabel className="flex gap-2 text-sm">
                        Status <FormMessage />
                      </FormLabel>
                      <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                        <div className="space-y-1 leading-none">
                          <FormLabel>Obra Ativa?</FormLabel>
                        </div>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
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
