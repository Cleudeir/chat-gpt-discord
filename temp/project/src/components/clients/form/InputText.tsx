import React from "react";
import { UseFormRegister } from "react-hook-form";
import { z } from "zod";

const InputText = <Key extends string, T extends z.ZodType<any>>({
  name,
  register,
  label,
  error,
  ...rest
}: {
  name: Key;
  label?: string;
  error?: string;
  register: UseFormRegister<T>;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        {...register(name)}
        {...rest}
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

const nomeSchema = z.string().min(3);
type Nome = z.infer<typeof nomeSchema>;

const sobrenomeSchema = z.string().min(3);
type Sobrenome = z.infer<typeof sobrenomeSchema>;

const emailSchema = z.string().email();
type Email = z.infer<typeof emailSchema>;

const senhaSchema = z.string().min(8);
type Senha = z.infer<typeof senhaSchema>;

const cpfSchema = z.string().refine((data) => {
  const cpf = data.replace(/\D/g, "");
  if (cpf.length !== 11) return false;
  if (cpf === "00000000000") return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let remainder = 11 - (sum % 11);

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.charAt(9))) {
    return false;
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }

  remainder = 11 - (sum % 11);

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
}, "CPF inválido");
type Cpf = z.infer<typeof cpfSchema>;

const dataNascimentoSchema = z.object({
  dia: z.string().refine((data) => parseInt(data) <= 31, "Dia inválido"),
  mes: z.string().refine((data) => parseInt(data) <= 12, "Mês inválido"),
  ano: z.string(),
});

const dataNascimentoFullSchema = z
  .string()
  .refine(
    (data) => {
      const dateArr = data.split("/");
      if (dateArr.length !== 3) {
        return false;
      }
      const [dia, mes, ano] = dateArr;
      return (
        parseInt(dia) <= 31 &&
        parseInt(mes) <= 12 &&
        parseInt(ano) >= 1900 &&
        parseInt(ano) <= new Date().getFullYear() - 18
      );
    },
    "Data de nascimento inválida, é necessário ter mais de 18 anos"
  );

const dataNascimentoFromUnix = (unixDate: string): string => {
  const dateConv = new Date(parseInt(unixDate) * 1000);

  const dia = dateConv.getDate().toString().padStart(2, "0");
  const mes = (dateConv.getMonth() + 1).toString().padStart(2, "0");
  const ano = dateConv.getFullYear();

  return `${dia}/${mes}/${ano}`;
};

const dataNascimentoToUnix = (date: string): string => {
  const [dia, mes, ano] = date.split("/");
  return new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia)).getTime() / 1000 + "";
};

type DataNascimento = z.infer<typeof dataNascimentoFullSchema>;
type DataNascimentoUnix = string;

const cepSchema = z.string().length(8);
type Cep = z.infer<typeof cepSchema>;

const telefoneSchema = z
  .string()
  .refine((data) => {
    const onlyNumbers = data.replace(/\D/g, "");
    return onlyNumbers.length >= 10 && onlyNumbers.length <= 11;
  }, "Telefone inválido");
type Telefone = z.infer<typeof telefoneSchema>;
