import * as z from "zod";
import { enderecoSchema } from "./endereco";

const clientSchema = z.object({
  id: z.number(),
  nome: z.string().min(3),
  sobrenome: z.string().min(3),
  cpfCnpj: z.string().refine((value) =>
    /^(([0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2})|([0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}))$/.test(value)
  ),
  dataNascimento: z.string().refine((value) => /\d{2}\/\d{2}\/\d{4}/.test(value)),
  dataRegistro: z.string().refine((value) => /\d{2}\/\d{2}\/\d{4}/.test(value)),
  sexo: z.enum(["feminino", "masculino"]),
  email: z.string().email(),
  senha: z.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[\]:;<>,.\?\\\/~_+\-=|]).{6,}$/),
  telefone: z.string().refine((value) => /\(\d{2,3}\)\s\d{1}\s\d{4}\-\d{4}/.test(value)),
  endereco: enderecoSchema,
  status: z.boolean(),
});

type Client = z.infer<typeof clientSchema>;

export { clientSchema, Client };
