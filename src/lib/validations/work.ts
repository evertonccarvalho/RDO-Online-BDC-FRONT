import * as z from "zod";

export const workSchema = z.object({
  company: z
    .string()
    .min(5, { message: "mínimo 5 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Não pode ter apenas espaços!",
    }),
  workDescription: z
    .string()
    .min(5, { message: "mínimo 5 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Não pode ter apenas espaços!",
    }),
  nameResponsible: z
    .string()
    .min(5, {
      message: "mínimo 5 caracteres",
    })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Não pode ter apenas espaços!",
    }),

  phoneContact: z.string().min(10, { message: "mínimo 10 caracteres" }).max(14),
  address: z
    .string()
    .min(10, { message: "mínimo 10 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Não pode ter apenas espaços!",
    }),
  active: z.boolean(),
});
