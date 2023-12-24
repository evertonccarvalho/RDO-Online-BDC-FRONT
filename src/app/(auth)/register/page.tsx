"use client";
import Input from "@/components/common/Input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import wallpaper from "@/images/wallpaper.jpg";
import { registerSchema } from "@/lib/validations/auth";
import authService from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  type FormValues = z.infer<typeof registerSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    try {
      setIsSubmitting(true);
      registerSchema.parse(data); // Validar os valores antes de chamar a API

      const { status } = await authService.register(data);
      if (status === 201) {
        toast({
          variant: "success",
          title: "Usuário registrado.",
          description: `foi registrado com sucesso`,
        });
        router.push("/login");
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao atualizar usuário.",
          description: "Houve um problema ao registar o usuário.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar usuário.",
        description: "Houve um erro ao atualizar o usuário.",
      });
    } finally {
      setIsSubmitting(false); // Definir isSubmitting como false após a finalização da requisição
    }
  }

  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="hidden h-full bg-muted lg:block">
        <div className="relative h-full w-full">
          <Image
            src={wallpaper}
            alt="wallpaper"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <LogInIcon className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar Conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Digite seus dados abaixo para criar sua conta
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="flex flex-col justify-around gap-4">
                <div className="grid grid-cols-1 gap-3">
                  <Input
                    placeholder="Nome Completo"
                    {...form.register("userName")}
                    value={form.watch("userName")}
                    error={form.formState.errors.userName} // Passando o erro correspondente ao campo
                  />
                  <Input
                    placeholder="E-mail"
                    type="email"
                    value={form.watch("email")}
                    {...form.register("email")}
                    error={form.formState.errors.email} // Passando o erro correspondente ao campo
                  />
                  <Input
                    placeholder="Senha"
                    type="password"
                    value={form.watch("password")}
                    {...form.register("password")} // Registrando o campo com react-hook-form
                    error={form.formState.errors.password}
                  />
                  <Input
                    placeholder="Confirm Senha"
                    type="password"
                    value={form.watch("confirmPassword")}
                    {...form.register("confirmPassword")} // Registrando o campo com react-hook-form
                    error={form.formState.errors.confirmPassword}
                  />
                </div>
                <Button disabled={isSubmitting} type="submit">
                  Criar nova conta
                </Button>
              </div>
            </form>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/login"
              className="hover:text-brand underline underline-offset-4"
            >
              Voltar para Login!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
