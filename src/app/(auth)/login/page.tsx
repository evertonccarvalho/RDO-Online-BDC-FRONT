"use client";
import Input from "@/components/common/form/Input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { loginSchema } from "@/lib/validations/auth";
import authService from "@/services/authService";
import { TokenService } from "@/services/tokenService";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (TokenService.get()) {
      router.push("/home");
    }
  }, [router]);

  type FormValues = z.infer<typeof loginSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    try {
      setIsSubmitting(true);
      loginSchema.parse(data); // Validar os valores antes de chamar a API

      const { status } = await authService.login(data);
      if (status === 200) {
        toast({
          variant: "success",
          title: "Usuário registrado.",
          description: `foi registrado com sucesso`,
        });
        router.push("/home");
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
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <LogInIcon className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Bem Vindo de volta
          </h1>
          <p className="text-sm text-muted-foreground">
            Digite seu e-mail e senha para entrar em sua conta
          </p>
        </div>
        <div className="grid gap-6">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Input
                  placeholder="E-mail"
                  type="email"
                  autoComplete="on" // Adicionando o atributo autoComplete para desativar o preenchimento automático
                  value={form.watch("email")}
                  {...form.register("email")}
                  error={form.formState.errors.email} // Passando o erro correspondente ao campo
                />
                <Input
                  placeholder="Senha"
                  type="password"
                  autoComplete="off" // Adicionando o atributo autoComplete para desativar o preenchimento automático
                  value={form.watch("password")}
                  {...form.register("password")} // Registrando o campo com react-hook-form
                  error={form.formState.errors.password}
                />
              </div>
              <Button disabled={isSubmitting} type="submit">
                Login
              </Button>
            </div>
          </form>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Não tem uma conta? Inscrever-se
          </Link>
        </p>
      </div>
    </div>
  );
}
