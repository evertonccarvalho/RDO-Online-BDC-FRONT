"use client";
import Input from "@/components/common/form/Input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { profileSchema } from "@/lib/validations/user";
import { useAuth } from "@/providers/authContext";
import profileService from "@/services/profileService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useCover from "@/images/cover.png";
import userAvatar from "@/images/user.png";
import VoltarButton from "../../components/VoltarButton";
import ProfileHeader from "./profileHeader";

interface UpdateCategoryProps {}

export default function UpdateProfileForm({}: UpdateCategoryProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  type FormValues = z.infer<typeof profileSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      userName: currentUser?.userName || "",
      email: currentUser?.email || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof profileSchema>) => {
      return profileService.updateProfile(currentUser?.id || "", data);
    },
  });

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    setIsSubmitting(true);

    try {
      const validatedData = profileSchema.parse(data);

      await mutation.mutateAsync(validatedData);
      queryClient.invalidateQueries({ queryKey: ["currentuser"] });
      toast({
        variant: "success",
        title: "Equipe registrada.",
        description: `${validatedData.userName} foi atualizado com sucesso`,
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
      <main className="max-h-[900px] bg-card">
        <div className="flex flex-col gap-9 rounded-sm bg-card p-5 sm:grid-cols-2">
          <ProfileHeader
            coverImageSrc={currentUser?.avatarUrl || useCover}
            profileImageSrc={currentUser?.avatarUrl || userAvatar}
            username={currentUser?.userName}
            role={currentUser?.role}
            email={currentUser?.email}
          />
          <VoltarButton href="/home" />
          <div className="flex flex-col gap-9 rounded-sm bg-card p-5 sm:grid-cols-2">
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="flex flex-col justify-around gap-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Input
                    placeholder="Nome de Usuário"
                    type="text"
                    value={form.watch("userName")}
                    {...form.register("userName")} // Registrando o campo com react-hook-form
                    error={form.formState.errors.userName}
                  />{" "}
                  <Input
                    placeholder="email"
                    type="email"
                    value={form.watch("email")}
                    {...form.register("email")} // Registrando o campo com react-hook-form
                    error={form.formState.errors.email}
                  />
                </div>
                <Button disabled={isSubmitting} type="submit">
                  Atualizar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
