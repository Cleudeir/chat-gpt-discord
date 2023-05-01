import type { Client } from "../../types/client";
import { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import Tbody from "../../components/clients/table/Tbody";

const Clients = (): JSX.Element => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [messageError, setMessageError] = useState<string>("");

  useEffect(() => {
    const getClients = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/clients`);
        const dados = await response.json();
        console.log(dados)
        setLoading(true)
        if (response.ok) setClients(dados);
        else throw new Error(dados.message);
      } catch (error) {
        setMessageError(error.message);
      } finally {
        setLoading(true);
      }
    };

    getClients();
  }, []);

  return (
    <Layout isLoading={isLoading} messageError={messageError} title="Clientes">
      <>
        <h1 className="pt-8 px-5 text-xl font-bold">Lista de clientes</h1>
        <div className="py-5 px-5">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Nome
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Sobrenome
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      CPF/CNPJ
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Data de nascimento
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Data de registro
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Sexo
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Telefone
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Endereço
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  text-left text-xs font-semibold uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-5 py-3">
                      <span className="sr-only">Editar</span>
                    </th>
                    <th scope="col" className="relative px-5 py-3">
                      <span className="sr-only">Remover</span>
                    </th>
                    <th scope="col" className="relative px-5 py-3">
                      <span className="sr-only">Visualizar</span>
                    </th>
                  </tr>
                </thead>
                <Tbody clients={clients} />
              </table>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Clients;
