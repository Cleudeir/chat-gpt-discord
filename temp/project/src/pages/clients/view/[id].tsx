import { GetServerSideProps } from 'next';
import Layout from '../../../components/common/Layout';
import { Client } from '../../../types/client';
import { useEffect, useState } from 'react';
import { UnixToDate } from '../../../utils/parse/UnixToDate';
import { useRouter } from 'next/dist/client/router';

type Props = {
  client: Client;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const { id } = params;
  const res = await fetch(`${process.env.API_URL}/clients/view/${id}`);
  const client: Client = await res.json();

  return {
    props: {
      client,
    },
  };
};

const ViewClient = ({ client }: Props) => {
  const { push } = useRouter();
  const { nome, sobrenome, cpfCnpj, email, sexo, dataNascimento, endereco } =
    client;
  const [formattedDataNascimento, setFormattedDataNascimento] =
    useState<string>('');

  useEffect(() => {
    setFormattedDataNascimento(UnixToDate(dataNascimento));
  }, [dataNascimento]);

  const handleEdit = () => {
    push(`/clients/edit/${client.id}`);
  };

  return (
    <Layout title={`${nome} ${sobrenome}`}>
      <div className="text-center">
        <h1 className="text-xl font-bold">{`${nome} ${sobrenome}`}</h1>
        <div className="mt-6">
          <p className="font-medium text-gray-900">CPF/CNPJ:</p>
          <p>{cpfCnpj}</p>
        </div>
        <div className="mt-6">
          <p className="font-medium text-gray-900">E-mail:</p>
          <p>{email}</p>
        </div>
        <div className="mt-6">
          <p className="font-medium text-gray-900">Sexo:</p>
          <p>{sexo}</p>
        </div>
        <div className="mt-6">
          <p className="font-medium text-gray-900">Data de nascimento:</p>
          <p>{formattedDataNascimento}</p>
        </div>
        <div className="mt-6">
          <p className="font-medium text-gray-900">Endereço:</p>
          <p>{`${endereco.logradouro}, ${endereco.numero} - ${endereco.complemento}`}</p>
          <p>{`${endereco.bairro}, ${endereco.cep}, ${endereco.localidade} - ${endereco.uf}`}</p>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-4"
            type="button"
            onClick={handleEdit}
          >
            Editar
          </button>
          <a
            href="/clients"
            className="bg-gray-300 text-gray-900 py-2 px-4 rounded hover:bg-gray-400"
          >
            Voltar
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default ViewClient;

