import * as z from "zod";
import { WorkSchema } from "./work";

export const shiftSchema = z.object({
  description: z
    .string()
    .min(5, { message: "mínimo 5 caracteres" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "Não pode ter apenas espaços!",
    }),
  feasibility: z.string(),
  weatherCondition: z.string(),
  status: z.string().default("Ativo"),
  teamId: z.number(),
});

export type ShiftSchema = {
  id: number;
  teamId: number;
  workId: number;
  description: string;
  feasibility: string;
  weatherCondition: string;
  status: string;
  work?: WorkSchema;
};
