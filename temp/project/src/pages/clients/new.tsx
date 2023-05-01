import { FunctionComponent, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Client, clientSchema } from "../../types/client";
import Layout from "../../components/common/Layout";
import InputText from "../../components/clients/form/InputText";
import InputSelect from "../../components/clients/form/InputSelect";

interface Props {
  title: string;
}

const NewClient: FunctionComponent<Props> = ({ title }) => {
  const { register, handleSubmit, formState, reset } = useForm<Client>({
    resolver: zodResolver(clientSchema),
  });

  const onSubmit = async (data: Client) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // go to clients list page
      } else {
        throw new Error("Error creating client");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={title}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 grid-cols-2">
          <InputText id="nome" label="Nome" register={register} required />
          <InputText
            id="sobreNome"
            label="Sobrenome"
            register={register}
            required
          />
          <InputText
            id="cpfCnpj"
            label="CPF/CNPJ"
            register={register}
            required
          />
          <InputSelect id="sexo" label="Gênero" register={register} />
          <InputText
            id="email"
            label="E-mail"
            register={register}
            required
          />
          <InputText
            id="senha"
            label="Senha"
            register={register}
            type="password"
            required
          />
          <InputText
            id="dataNascimento"
            label="Data de Nascimento"
            register={register}
            required
          />
          <InputText id="cep" label="CEP" register={register} required />
          <InputText
            id="logradouro"
            label="Logradouro"
            register={register}
            required
          />
          <InputText
            id="numero"
            label="Número"
            register={register}
            required
          />
          <InputText
            id="complemento"
            label="Complemento"
            register={register}
          />
          <InputText id="bairro" label="Bairro" register={register} />
          <InputText id="cidade" label="Cidade" register={register} />
          <InputSelect id="estado" label="Estado" register={register} />
          <InputText id="telefone" label="Telefone" register={register} />
          <InputSelect id="status" label="Status" register={register} />
        </div>
        <div className="flex justify-end my-4">
          <button
            type="submit"
            disabled={!formState.isDirty || !formState.isValid}
            className="btn bg-green-500 hover:bg-green-600"
          >
            Criar
          </button>
          <button
            type="button"
            disabled={!formState.isDirty}
            onClick={() => reset()}
            className="btn bg-gray-400 hover:bg-gray-500 ml-4"
          >
            Limpar
          </button>
          <a href="/clients" className="btn bg-gray-400 hover:bg-gray-500 ml-4">
            Voltar
          </a>
        </div>
      </form>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      title: "Novo Cliente",
    },
  };
};

export default NewClient;

