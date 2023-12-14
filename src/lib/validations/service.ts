import * as z from "zod";
import { WorkSchema } from "./work";

export const serviceSchema = z.object({
  serviceDescription: z
    .string()
    .min(5, { message: "mínimo 5 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Não pode ter apenas espaços!",
    }),
  unit: z.string(),
  totalAmount: z.string(),
  status: z.string().default("Ativo"),
  subcategoryId: z.string(),
});

export type ServiceSchema = {
  id: number;
  serviceDescription: string;
  unit: string;
  status: string;
  totalAmount: string;
  subcategoryId?: string;
  work?: WorkSchema;
};
