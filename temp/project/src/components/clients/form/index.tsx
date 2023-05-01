import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from './InputText';
import { InputSelect } from './InputSelect';
import { ClientSchema, ClientType } from '../../../types/client';

type Props = {
  defaultValues: ClientType;
};

export function ClientForm({ defaultValues }: Props) {
  const form = useForm<ClientType>({
    resolver: zodResolver(ClientSchema),
    defaultValues,
  });

  const { handleSubmit, formState } = form;

  const { errors } = formState;

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit(() => {})}>
      <InputText label="Nome" name="nome" errors={errors} form={form} />
      <InputText label="Sobrenome" name="sobreNome" errors={errors} form={form} />
      <InputText label="CPF/CNPJ" name="cpfCnpj" errors={errors} form={form} />
      <InputText label="Data de nascimento" name="dataNascimento" errors={errors} form={form} />
      <InputText label="Telefone" name="telefone" errors={errors} form={form} />
      <InputText label="E-mail" name="email" errors={errors} form={form} />
      <InputText label="Senha" name="senha" errors={errors} type="password" form={form} />
      <InputSelect label="Sexo" name="sexo" options={['homem', 'mulher']} errors={errors} form={form} />
      <InputText label="Logradouro" name="endereco.logradouro" errors={errors} form={form} />
      <InputText label="Número" name="endereco.numero" errors={errors} form={form} />
      <InputText label="Complemento" name="endereco.complemento" errors={errors} form={form} />
      <InputText label="Bairro" name="endereco.bairro" errors={errors} form={form} />
      <InputText label="CEP" name="endereco.cep" errors={errors} form={form} />
      <InputText label="Localidade" name="endereco.localidade" errors={errors} form={form} />
      <InputText label="UF" name="endereco.uf" errors={errors} form={form} />

      <button
        type="submit"
        className="w-full my-4 py-2 px-4 rounded-md bg-blue-700 hover:bg-blue-800 text-white font-semibold">
        Salvar
      </button>
    </form>
  );
}
