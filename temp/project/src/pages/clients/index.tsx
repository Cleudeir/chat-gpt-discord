import { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import Tbody from '../../components/clients/table/Tbody';
import { Client } from '@/types/client';
import Link from 'next/link';

const Clients = (): JSX.Element => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string| null>(null);
  useEffect(() => {
    async function fetchClients(){
      const response = await fetch('/api/cliente/listar')
      if (response.status !== 200) {
        setMessageError(response.statusText)
      };
      const json = await  response.json();
      setClients(json);
      setLoading(true)
    }
    fetchClients()
  }, []);

  useEffect(() => {
     console.log(clients)
  }, [clients]);

  return (
    <Layout title="Clients" isLoading={isLoading} messageError={messageError}>
      <div className="mb-5">
        <Link
          href="/clients/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New Client
        </Link>
      </div>
      <Tbody clients={clients} />
    </Layout>
  );
};

export default Clients;
