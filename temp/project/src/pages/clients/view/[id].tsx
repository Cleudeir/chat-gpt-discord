import { useEffect, useState } from "react";
import Layout from "../../../components/common/Layout";
import { Client } from "../../../types/client";

type ViewClientPageProps = {
  id: string;
};

export default function ViewClientPage({ id=1 }: ViewClientPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [client, setClient] = useState<Client | null>(null);
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    console.log(id)
    fetch(`/api/clients/view/${id}`)
      .then((response) => response.json())
      .then((data) => setClient(data))
      .then((data) => console.log(data))
      .catch((error) => setMessageError(error.message))
      .finally(() => setIsLoading(true));
  }, [id]);

  return (
    <Layout title="Visualizar cliente" isLoading={isLoading} messageError={messageError}>
      <div className="bg-white rounded-md shadow-md p-10">
        <h1 className="text-2xl font-bold mb-5">Dados do cliente</h1>
        {!isLoading && client ? (
          <div>
            <div className="mb-5">
              <span className="font-bold">Nome:</span> {client.nome}
            </div>
            <div className="mb-5">
              <span className="font-bold">Sobrenome:</span> {client.sobrenome}
            </div>
            <div className="mb-5">
              <span className="font-bold">CPF/CNPJ:</span> {client.cpfCnpj}
            </div>
            <div className="mb-5">
              <span className="font-bold">Data de nascimento:</span> {client.dataNascimento}
            </div>
            <div className="mb-5">
              <span className="font-bold">Data de registro:</span> {client.dataRegistro}
            </div>
            <div className="mb-5">
              <span className="font-bold">Sexo:</span> {client.sexo}
            </div>
            <div className="mb-5">
              <span className="font-bold">E-mail:</span> {client.email}
            </div>
            <div className="mb-5">
              <span className="font-bold">Telefone:</span> {client.telefone}
            </div>
            <div className="mb-5">
              <span className="font-bold">Endereço:</span>{" "}
              {`${client.endereco.logradouro}, ${client.endereco.numero}, ${client.endereco.complemento}, ${client.endereco.bairro}, ${client.endereco.cep}, ${client.endereco.localidade}, ${client.endereco.uf}`}
            </div>
            <div className="mb-5">
              <span className="font-bold">Status:</span>{" "}
              {client.status ? "Ativo" : "Inativo"}
            </div>
          </div>
        ) : null}
      </div>
      <a href="/clients">Voltar</a>
    </Layout>
  );
}
