import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/common/Layout";
import ClientForm from "@/components/clients/form";

const ClientEdit: NextPage = () => {
  const [client,setClient] = useState(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string| null>(null);
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchClients(){
      console.log("fetch");
      const response = await fetch('/api/cliente/listar')
      console.log("response", response);
      if (response.status !== 200) {
        setMessageError(response.statusText)
      }
      const json = await  response.json();  
      console.log(json)    
      setClient(json.filter((x:any)=> x.id === Number(router.query.id))[0]);
      setLoading(true)
    }
    if(router.query.id){
      fetchClients()
    }
    console.log(router.query.id);
   
  }, [router.query]);

  const submit = async (data) => {
    console.log("dasta",data);
    setLoading(true);
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
      messageError={messageError}
    >
      <h1 className="text-2xl font-bold">Editar Cliente</h1>
      <ClientForm defaultValues={client} submit={submit}/>
    </Layout>
  );
};

export default ClientEdit;
