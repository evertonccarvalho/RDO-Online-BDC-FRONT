import * as z from "zod";
import { WorkSchema } from "./work";

export const teamSchema = z.object({
  descricaoEquipe: z
    .string()
    .min(5, { message: "mínimo 5 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Não pode ter apenas espaços!",
    }),
  empresaContratada: z.string(),
  status: z.string().default("Ativo"),
});

export type TeamSchema = {
  id: number;
  descricaoEquipe: string;
  empresaContratada: string;
  status: string;
  work?: WorkSchema;
};
