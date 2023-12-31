import { z } from "zod";

// Defina um esquema Zod para validar os campos do usuário
export const userSchema = z.object({
  userName: z
    .string()
    .min(5, { message: "mínimo 5 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Não pode ter apenas espaços!",
    }),
  email: z.string().email(), // Certifica-se de que o campo de e-mail seja um e-mail válido
  role: z.string(),
  active: z.boolean(),
});

export const profileSchema = z.object({
  userName: z
    .string()
    .min(5, { message: "mínimo 5 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Não pode ter apenas espaços!",
    }),
  email: z.string().email(),
});

export type UserSchema = {
  id?: number;
  userName: string;
  email: string;
  role: string;
  active: boolean;
};

export type ProfileSchema = {
  id?: number;
  userName: string;
  email: string;
};
