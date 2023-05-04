import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import  InputText  from './InputText';
import  InputSelect  from './InputSelect';
import { clientSchema, Client } from '../../../types/client';

type Props = {
  defaultValues?: Client | {};
  submit : (func: any) => Promise<void>;
};

const BrazilianStates = [
  {id: "AC", value: "Acre"},
  {id: "AL", value: "Alagoas"},
  {id: "AP", value: "Amapá"},
  {id: "AM", value: "Amazonas"},
  {id: "BA", value: "Bahia"},
  {id: "CE", value: "Ceará"},
  {id: "DF", value: "Distrito Federal"},
  {id: "ES", value: "Espírito Santo"},
  {id: "GO", value: "Goiás"},
  {id: "MA", value: "Maranhão"},
  {id: "MT", value: "Mato Grosso"},
  {id: "MS", value: "Mato Grosso do Sul"},
  {id: "MG", value: "Minas Gerais"},
  {id: "PA", value: "Pará"},
  {id: "PB", value: "Paraíba"},
  {id: "PR", value: "Paraná"},
  {id: "PE", value: "Pernambuco"},
  {id: "PI", value: "Piauí"},
  {id: "RJ", value: "Rio de Janeiro"},
  {id: "RN", value: "Rio Grande do Norte"},
  {id: "RS", value: "Rio Grande do Sul"},
  {id: "RO", value: "Rondônia"},
  {id: "RR", value: "Roraima"},
  {id: "SC", value: "Santa Catarina"},
  {id: "SP", value: "São Paulo"},
  {id: "SE", value: "Sergipe"},
  {id: "TO", value: "Tocantins"}
]

const sexos = [{id:"homem" ,value:'homem'},{id:"mulher" ,value: 'mulher'}]

export default function ClientForm({ defaultValues = {} , submit }: Props) {
  const form = useForm<Client>({
    resolver: zodResolver(clientSchema),
    defaultValues,
  });


  return (
    <form className="max-w-sm mx-auto" onSubmit={()=>form.handleSubmit((e)=>submit(e))}>
      <InputText label="Nome" name="nome" form={form} />
      <InputText label="Sobrenome" name="sobrenome" form={form} />
      <InputText label="CPF/CNPJ" name="cpfCnpj" form={form} />
      <InputText label="Data de nascimento" name="dataNascimento" form={form} />
      <InputText label="E-mail" name="email" form={form} />
      <InputText label="Telefone" name="telefone" form={form} />
      <InputText label="Senha" name="senha" type="password" form={form} />
      <InputSelect label="Sexo" name="sexo" options={sexos} form={form} />
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
