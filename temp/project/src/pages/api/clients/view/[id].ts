import type { NextApiRequest, NextApiResponse } from "next";
import { fakeClients } from "../../../../components/fake/clients";
import { ClientSchema } from "../../../../types/client";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req;

  const client = fakeClients.find((client) => client.id === Number(id));
  if (!client) {
    return res.status(404).json({ message: "Client not found" });
  }

  try {
    const parsedClient = ClientSchema.parse(client);
    return res.status(200).json(parsedClient);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
