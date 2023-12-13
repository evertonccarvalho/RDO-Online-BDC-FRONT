"use client";
import VoltarButton from "@/app/(home)/components/VoltarButton";
import ProfileHeader from "@/app/(home)/currentuser/[id]/profileHeader";
import { Button } from "@/components/ui/button";

import FormInputField from "@/components/common/form/FormInputField";
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
import useCover from "@/images/cover.png";
import userAvatar from "@/images/user.png";
import { WorkSchema, workSchema } from "@/lib/validations/work";
import { workService } from "@/services/workService";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
export default function UpdateWorker() {
  const { toast } = useToast();
  const [work, setWork] = useState<WorkSchema | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").pop();

  async function getWork(workId: string | undefined): Promise<void> {
    try {
      if (workId === undefined) {
        throw new Error("ID do usuário não fornecido.");
      }

      const data = await workService.getById(+workId);
      setWork(data);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  }

  useEffect(() => {
    getWork(id);
  }, [id]);

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
    workSchema.parse(data);
    const res = await workService.update(work?.id || "", data);
    console.log("User updated successfully:", res);

    if (res === 200) {
      toast({
        variant: "success",
        title: "Usuário atualizado.",
        description: `${work?.workDescription} foi atualizado com sucesso`,
      });
    }
    router.push("/obra");
  }

  return (
    <>
      <VoltarButton href="/obra" />
      <div className="flex flex-col gap-9 rounded-sm bg-card p-5 sm:grid-cols-2">
        <ProfileHeader
          coverImageSrc={useCover}
          profileImageSrc={userAvatar}
          username={work?.company}
          role={work?.workDescription}
          email={work?.nameResponsible}
        />
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
      </div>
    </>
  );
}
