"use client";
import VoltarButton from "@/app/(home)/components/VoltarButton";
import { Checkbox } from "@/components/ui/checkbox";

import ProfileHeader from "@/app/(home)/currentuser/[id]/profileHeader";
import FormInputField from "@/components/common/form/FormInputField";
import { Button } from "@/components/ui/button";
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
import { userSchema } from "@/lib/validations/user";
import usersServices, { UserParams } from "@/services/usersServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RoleSelectField from "./components/RoleSelectField";
export default function UpdateUserForm() {
  const { toast } = useToast();
  const [user, setUser] = useState<UserParams | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").pop();

  async function getUser(userId: string | undefined): Promise<void> {
    try {
      if (userId === undefined) {
        throw new Error("ID do usuário não fornecido.");
      }

      const data = await usersServices.getById(+userId);
      setUser(data);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  }

  useEffect(() => {
    getUser(id);
  }, [id]);

  type FormValues = z.infer<typeof userSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userName: user?.userName || "",
      email: user?.email || "",
      role: user?.role || "",
      active: user?.active,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      form.setValue("email", user.email || "");
      form.setValue("userName", user.userName || "");
      form.setValue("role", user.role || "");
      form.setValue("active", user.active || true);
    }
  }, [form, user]);

  async function onSubmit(data: z.infer<typeof userSchema>) {
    const res = await usersServices.update(user?.id || "", data);
    console.log("User updated successfully:", res);

    if (res === 200) {
      toast({
        variant: "success",
        title: "Usuário atualizado.",
        description: `${user?.userName} foi atualizado com sucesso`,
      });
    }
    router.push("/usuario");
  }

  return (
    <>
      <main className="max-h-[900px] bg-card">
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
                    <FormInputField
                      control={form.control}
                      name="email"
                      label="Email"
                      type="email"
                      maxLength={50}
                      placeholder="email@email.com"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2  lg:grid-cols-4">
                    <RoleSelectField
                      control={form.control}
                      name="role"
                      label="Role"
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
                              <FormLabel>Usuario Ativo?</FormLabel>
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
      </main>
    </>
  );
}
