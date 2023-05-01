import type { NextApiRequest, NextApiResponse } from 'next'
import { ClientSchema, enderecoSchema } from '../../../../types/client'
import { z } from 'zod';

type ErrorResponse = {
    message: string;
};

const createNewClient = async (client: ClientType): Promise<ClientType> => {
    // This would be a database integration instead of adding clients to an array
    const fakeClients = require('../../../../components/fake/clients').default;
    const newClient = {
        ...client,
        id: fakeClients.length + 1,
        dataRegistro: new Date().toLocaleDateString('pt-br'),
    };
    fakeClients.push(newClient);
    return newClient;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ClientType | ErrorResponse>) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const schema = z.object({
            nome: ClientSchema.shape.nome,
            sobrenome: ClientSchema.shape.sobrenome,
            cpfCnpj: ClientSchema.shape.cpfCnpj,
            dataNascimento: ClientSchema.shape.dataNascimento,
            sexo: ClientSchema.shape.sexo,
            email: ClientSchema.shape.email,
            senha: ClientSchema.shape.senha,
            endereco: enderecoSchema,
            status: ClientSchema.shape.status,
        });
        const validatedData = schema.parse(req.body);
        const createdClient = await createNewClient(validatedData);
        return res.status(200).json(createdClient);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
