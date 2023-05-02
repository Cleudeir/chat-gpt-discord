import * as z from "zod";
import { enderecoSchema } from "./endereco";

export const clientSchema = z.object({
  id: z.number(),
  nome: z.string().nonempty().max(255),
  sobrenome: z.string().nonempty().max(255),
  cpfCnpj: z.string().transform((value: string) =>
    value.replace(/[^\d]+/g, "")
  ).refine(value => value.length === 11 || value.length === 14),
  dataNascimento: z.string().transform((value: string) =>
    new Date(value).getTime().toString()
  ),
  dataRegistro: z.string().transform((value: string) =>
    new Date(value).getTime().toString()
  ),
  sexo: z.string(),
  email: z.string().email(),
  senha: z.string().min(6).max(255),
  endereco: enderecoSchema,
  status: z.boolean(),
});

export type Client = z.infer<typeof clientSchema>;
