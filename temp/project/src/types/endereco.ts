import * as z from 'zod';

export const enderecoSchema = z.object({
  logradouro: z.string().nonempty({ message: 'Campo obrigatório.' }).max(70, { message: 'Máximo de 70 caracteres.' }),
  numero: z.string().nonempty({ message: 'Campo obrigatório.' }).max(10, { message: 'Máximo de 10 caracteres.' }),
  complemento: z.string().max(50, { message: 'Máximo de 50 caracteres.' }).optional(),
  bairro: z.string().nonempty({ message: 'Campo obrigatório.' }).max(50, { message: 'Máximo de 50 caracteres.' }),
  cep: z.string().regex(/^\d{5}-\d{3}$/, { message: 'Formato inválido.' }).nonempty({ message: 'Campo obrigatório.' }),
  localidade: z.string().nonempty({ message: 'Campo obrigatório.' }).max(50, { message: 'Máximo de 50 caracteres.' }),
  uf: z.string().length(2, { message: 'Deve conter 2 caracteres.' }).nonempty({ message: 'Campo obrigatório.' }),
});

export type Endereco = z.infer<typeof enderecoSchema>;
