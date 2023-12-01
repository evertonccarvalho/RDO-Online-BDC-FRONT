"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { profileSchema } from "@/lib/validations/user";
import profileService from "@/services/profileService";
import { TokenService } from "@/services/tokenService";
import { UserParams } from "@/services/usersServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import FormInputField from "@/components/common/form/FormInputField";
import useCover from "@/images/cover.png";
import userAvatar from "@/images/user.png";
import VoltarButton from "../../components/VoltarButton";
import ProfileHeader from "./profileHeader";

export default function UpdateProfileForm() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [initialEmail, setInitialEmail] = useState<string | null>(null);
  const [user, setUser] = useState<UserParams | null>(null);

  async function getUser(userId: string | undefined): Promise<void> {
    try {
      if (userId === undefined) {
        throw new Error("ID do usuário não fornecido.");
      }
      const data = await profileService.fetchCurrent();
      setUser(data);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  }

  useEffect(() => {
    getUser(id);
  }, [id]);

  type FormValues = z.infer<typeof profileSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      userName: user?.userName || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      form.setValue("userName", user.userName);
      form.setValue("email", user.email);
    }
  }, [form, user]);

  async function onSubmit(data: z.infer<typeof profileSchema>) {
    try {
      setLoading(true);
      const res = await profileService.updateProfile(user?.id || "", data);

      if (res === 200) {
        toast({
          variant: "success",
          title: "Usuário atualizado.",
          description: `${user?.userName} foi atualizado com sucesso`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao atualizar usuário.",
          description: "Houve um problema ao atualizar o usuário.",
        });
      }

      // Verifica se o email foi alterado
      if (data.email !== initialEmail) {
        TokenService.remove(); // Remove o token se o email foi alterado
      }

      router.push("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar usuário.",
        description: "Houve um erro ao atualizar o usuário.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main className="max-h-[900px] bg-red-700">
        <div className="flex flex-col gap-9 rounded-sm bg-card p-5 sm:grid-cols-2">
          <ProfileHeader
            coverImageSrc={user?.avatarUrl || useCover}
            profileImageSrc={user?.avatarUrl || userAvatar}
            username={user?.userName}
            role={user?.role}
            email={user?.email}
          />
          <VoltarButton href="/home" />
          <div className="flex flex-col gap-9 rounded-sm bg-card p-5 sm:grid-cols-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <div className="flex flex-col justify-around gap-4">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <FormInputField
                      control={form.control}
                      name="userName"
                      label="Nome Completo"
                      placeholder="Nome Completo"
                      maxLength={25}
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
      </main>
    </>
  );
}
