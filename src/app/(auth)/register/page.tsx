"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import authService from "@/services/authService";
import { TokenService } from "@/services/tokenService";
import { LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userName, setUserName] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState(""); // Nova variável de estado para a mensagem

  useEffect(() => {
    if (TokenService.get()) {
      router.push("/home");
    }
  }, [router]);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = { userName, email, password };

    if (password !== passwordConfirm) {
      // Configurando a mensagem de erro diretamente
      setRegistrationMessage("A senha e confirmação são diferentes!");
      return;
    }

    const { data, status } = await authService.register(params);

    if (status === 201) {
      router.push("/login?registred=true");
    } else {
      // Configurando a mensagem de erro diretamente
      setRegistrationMessage(
        data?.message || "Ocorreu um erro durante o registro.",
      );
    }
  };

  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="hidden h-full bg-muted lg:block" />
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
            <form onSubmit={handleRegister}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <label className="sr-only" htmlFor="email">
                    Nome
                  </label>
                  <Input
                    id="userName"
                    placeholder="Seu Nome"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="name"
                    autoCorrect="off"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />{" "}
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="sr-only" htmlFor="email">
                    senha
                  </label>
                  <Input
                    id="password"
                    placeholder="*******"
                    type="password"
                    autoCorrect="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />{" "}
                  <Input
                    id="passwordConfirm"
                    placeholder="*******"
                    type="password"
                    autoCorrect="off"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
                <Button type="submit">Registro</Button>
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
