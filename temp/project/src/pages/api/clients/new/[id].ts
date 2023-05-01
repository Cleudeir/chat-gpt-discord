import type { NextApiRequest, NextApiResponse } from "next";
import { Client, clientSchema } from "../../../../types/client";
import { enderecoSchema } from "../../../../types/endereco";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "PUT") {
      const client: Client = {
        id: Math.floor(Math.random() * 100),
        dataRegistro: new Date().toISOString(),
        nome: req.body.nome,
        sobreNome: req.body.sobreNome,
        cpfCnpj: req.body.cpfCnpj,
        dataNascimento: req.body.dataNascimento,
        sexo: req.body.sexo,
        email: req.body.email,
        senha: req.body.senha,
        telefone: req.body.telefone,
        endereco: enderecoSchema.parse(req.body.endereco),
        status: true,
      };
      clientSchema.parse(client);
      res.status(201).json({
        status: "success",
        message: "Cliente cadastrado com sucesso!",
        data: client,
      });
    } else {
      res.status(405).json({ message: "Metódo não permitido" });
    }
  } catch (error) {
    if (error.code === "invalid_argument") {
      console.error(error);
      res.status(422).json({ message: error.errors });
    } else {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
};

export default handler;
