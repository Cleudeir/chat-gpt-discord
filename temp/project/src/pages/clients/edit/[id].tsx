import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/common/Layout";
import { clientSchema, Client } from "../../../types/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProviderProps, useForm } from "react-hook-form";
import InputText from "../../../components/clients/form/InputText";
import { capitalize } from "../../../utils/parse/Capitalize";
import UnixToDate from "../../../utils/parse/UnixToDate";
import validateCPF from "../../../utils/validate/Cpf";
import validateCNPJ from "../../../utils/validate/Cnpj";
import ErrorMessage from "./../../../components/common/ErrorMessage";
import ClientForm from "@/components/clients/form";

interface Props {
  client: Client;
}

const ClientEdit: NextPage<Props> = ({ client }) => {
  console.log(client);
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (data: { endereco: { cep: string; numero: string; }; dataNascimento: string; cpfCnpj: string; }) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/clients/edit/${client.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          endereco: {
            ...data.endereco,
            cep: data.endereco.cep.replace(".", "").replace("-", ""),
            numero: parseInt(data.endereco.numero),
          },
          dataNascimento: data.dataNascimento
            ? Date.parse(data.dataNascimento) / 1000
            : undefined,
          cpfCnpj: data.cpfCnpj
            .replace(".", "")
            .replace("-", "")
            .replace("/", ""),
        }),
      });

      if (!res.ok) {
        throw new Error("Não foi possível editar o cliente.");
      }

      setIsLoading(false);
      router.push("/clients");
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <Layout
      title="Editar Cliente"
      isLoading={isLoading}
      messageError={errorMessage}
    >
      <h1 className="text-2xl font-bold">Editar Cliente</h1>
      <ClientForm defaultValues={client}/>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params
}) => {
  console.log("id:", params);
  try {
    const res = await fetch(
      `http://localhost:3000/api/clients/view/${params.id}`
    );
    const client = await res.json();
    console.log(params.id, client);

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
