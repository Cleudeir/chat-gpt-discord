import { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import Tbody from '../../components/clients/table/Tbody';
import type { Client } from '../../types/client';

const Clients = (): JSX.Element => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/clients')
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => setClients(data))
      .catch((error) => setErrorMsg(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout title="Clients" loading={loading} errorMsg={errorMsg}>
      <div className="mb-5">
        <a
          href="/clients/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New Client
        </a>
      </div>
      <Tbody clients={clients} />
    </Layout>
  );
};

export default Clients;
