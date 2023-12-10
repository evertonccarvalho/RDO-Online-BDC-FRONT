import { z } from "zod";

export const registerSchema = z
  .object({
    userName: z
      .string()
      .min(5, { message: "mínimo 5 caracteres" })
      .refine((value) => !/^\s*$/.test(value), {
        message: "Não pode ter apenas espaços!",
      }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "mínimo 8 caracteres" }) // Mínimo 8 caracteres para a senha
      .refine(
        (value) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(value),
        {
          message: "Senha deve ter 1 letra maiúscula, 1 minúscula e 1 número",
        },
      ),
    confirmPassword: z
      .string()
      .min(8, { message: "mínimo 8 caracteres" }) // Mínimo 8 caracteres para a senha
      .refine(
        (value) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(value),
        {
          message: "Senha deve ter 1 letra maiúscula, 1 minúscula e 1 número",
        },
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
