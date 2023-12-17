import * as z from "zod";

export const serviceSchema = z.object({
  serviceDescription: z
    .string()
    .min(5, { message: "mínimo 5 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Não pode ter apenas espaços!",
    }),
  unit: z.string(),
  totalAmount: z.string().or(z.number().min(1)),
  status: z.string().default("Ativo"),
  subcategoryId: z.string().or(z.number().min(1)),
});
