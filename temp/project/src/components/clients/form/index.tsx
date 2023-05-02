import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import  InputText  from './InputText';
import  InputSelect  from './InputSelect';
import { clientSchema, Client } from '../../../types/client';

type Props = {
  defaultValues?: Client | {};
};

const BrazilianStates = [
  "Acre",
  "Alagoas",
  "Amapá",
  "Amazonas",
  "Bahia",
  "Ceará",
  "Distrito Federal",
  "Espírito Santo",
  "Goiás",
  "Maranhão",
  "Mato Grosso",
  "Mato Grosso do Sul",
  "Minas Gerais",
  "Pará",
  "Paraíba",
  "Paraná",
  "Pernambuco",
  "Piauí",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rio Grande do Sul",
  "Rondônia",
  "Roraima",
  "Santa Catarina",
  "São Paulo",
  "Sergipe",
  "Tocantins"
]


export default function ClientForm({ defaultValues = {} }: Props) {
  const form = useForm<Client>({
    resolver: zodResolver(clientSchema),
    defaultValues,
  });

  const { handleSubmit, formState } = form;

  const { errors } = formState;

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit(() => {})}>
      <InputText label="Nome" name="nome" form={form} />
      <InputText label="Sobrenome" name="sobrenome" form={form} />
      <InputText label="CPF/CNPJ" name="cpfCnpj" form={form} />
      <InputText label="Data de nascimento" name="dataNascimento" form={form} />
      <InputText label="E-mail" name="email" form={form} />
      <InputText label="Senha" name="senha" type="password" form={form} />
      <InputSelect label="Sexo" name="sexo" options={['homem', 'mulher']} form={form} />
      <InputText label="Logradouro" name="endereco.logradouro" form={form} />
      <InputText label="Número" name="endereco.numero" form={form} />
      <InputText label="Complemento" name="endereco.complemento" form={form} />
      <InputText label="Bairro" name="endereco.bairro" form={form} />
      <InputText label="CEP" name="endereco.cep" form={form} />
      <InputText label="Localidade" name="endereco.localidade" form={form} />
      <InputSelect label="Estado" name="endereco.uf" options={BrazilianStates} form={form} />

      <button
        type="submit"
        className="w-full my-4 py-2 px-4 rounded-md bg-blue-700 hover:bg-blue-800 text-white font-semibold">
        Salvar
      </button>
    </form>
  );
}
