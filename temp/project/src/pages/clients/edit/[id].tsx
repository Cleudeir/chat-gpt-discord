import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../../components/common/Layout';
import { ClientSchema, Type } from '../../../types/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import InputText from '../../../components/clients/form/InputText';
import { capitalize } from '../../../utils/parse/Capitalize';
import { UnixToDate } from '../../../utils/parse/UnixToDate';
import { addressSchema } from '../../../types/endereco';
import { ErrorMessage } from '@hookform/error-message';
import { validateCPF } from '../../../utils/validate/Cpf';
import { validateCNPJ } from '../../../utils/validate/Cnpj';
import { useToasts } from 'react-toast-notifications';

interface Props {
  client: Type;
}

const ClientEdit: NextPage<Props> = ({ client }) => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { addToast } = useToasts();

  const form = useForm<Type>({
    resolver: zodResolver(ClientSchema),
    defaultValues: {
      ...client,
      endereco: {
        ...client.endereco,
        cep: client.endereco.cep.replace('.', '').replace('-', ''),
        numero: client.endereco.numero.toString(),
      },
      cpfCnpj: client.cpfCnpj.replace('.', '').replace('-', '').replace('/', ''),
      dataNascimento: UnixToDate(client.dataNascimento),
    },
  });

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/clients/edit/${client.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          endereco: {
            ...data.endereco,
            cep: data.endereco.cep.replace('.', '').replace('-', ''),
            numero: parseInt(data.endereco.numero),
          },
          dataNascimento: data.dataNascimento
            ? Date.parse(data.dataNascimento) / 1000
            : undefined,
          cpfCnpj: data.cpfCnpj.replace('.', '').replace('-', '').replace('/', ''),
        }),
      });
      
      if (!res.ok) {
        throw new Error('Não foi possível editar o cliente.');
      }

      setIsLoading(false);
      addToast('Cliente editado com sucesso.', {
        appearance: 'success',
        autoDismiss: true,
      });
      router.push('/clients');
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    setErrorMessage('');
  }, [form.watch()]);

  return (
    <Layout title="Editar Cliente" isLoading={isLoading} messageError={errorMessage}>
      <h1 className="text-2xl font-bold">Editar Cliente</h1>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputText label="Nome" name="nome" form={form} autoFocus />
        <InputText label="Sobrenome" name="sobrenome" form={form} />
        <InputText label="Email" name="email" type="email" form={form} />
        <InputText label="CPF / CNPJ" name="cpfCnpj" maxLength={18} form={form} />
        {form.watch('cpfCnpj') &&
          (validateCPF(form.watch('cpfCnpj')) || validateCNPJ(form.watch('cpfCnpj'))) && (
            <ErrorMessage errors={form.errors} name="cpfCnpj">
              {({ message }) => <div className="text-red-500">{message}</div>}
            </ErrorMessage>
          )}
        <InputText
          label="Data de Nascimento"
          name="dataNascimento"
          type="date"
          form={form}
          max={UnixToDate(Date.now() / 1000)}
        />
        <InputText label="CEP" name="endereco.cep" maxLength={9} form={form} />
        <InputText label="Logradouro" name="endereco.logradouro" form={form} />
        <InputText label="Número" name="endereco.numero" form={form} />
        <InputText label="Complemento" name="endereco.complemento" form={form} />
        <InputText label="Bairro" name="endereco.bairro" form={form} />
        <InputText label="Cidade" name="endereco.localidade" form={form} />
        <InputText label="UF" name="endereco.uf" maxLength={2} form={form} />
        {form.watch('endereco.cep') !== undefined && form.watch('endereco.cep').replace(/\D/g, '') !== '' && (
          <button
            type="button"
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition-colors focus:outline-none mb-4"
            onClick={async () => {
              try {
                const res = await fetch(
                  `https://viacep.com.br/ws/${form.watch('endereco.cep').replace('.', '').replace('-', '')}/json/`,
                );
                const data = await res.json();
                form.setValue('endereco.logradouro', capitalize(data.logradouro));
                form.setValue('endereco.complemento', data.complemento);
                form.setValue('endereco.bairro', capitalize(data.bairro));
                form.setValue('endereco.localidade', capitalize(data.localidade));
                form.setValue('endereco.uf', capitalize(data.uf));
              } catch (error) {
                addToast('Não foi possível buscar o endereço.', {
                  appearance: 'error',
                  autoDismiss: true,
                });
              }
            }}
          >
            Buscar Endereço
          </button>
        )}
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors focus:outline-none mr-4"
          >
            Salvar
          </button>

          <button
            type="button"
            className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition-colors focus:outline-none"
            onClick={() => router.back()}
          >
            Cancelar
          </button>
        </div>
      </form>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  try {
    const res = await fetch(`http://localhost:3000/api/clients/view/${params.id}`);
    const client = await res.json();

    return {
      props: {
        client,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default ClientEdit;
