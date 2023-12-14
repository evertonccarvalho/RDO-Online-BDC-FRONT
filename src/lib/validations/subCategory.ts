import * as z from "zod";

export const subCategorySchema = z.object({
  name: z
    .string()
    .min(5, { message: "mínimo 5 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Não pode ter apenas espaços!",
    }),
  status: z.string().default("Ativo"),
  serviceCategoryId: z.string().min(1),
});
