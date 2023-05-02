import type { NextApiRequest, NextApiResponse } from "next";
import { fakeClients } from "../../../../components/fake/clients";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req;

  const [client] = fakeClients.filter((client) => client.id === Number(id));
  if (!client) {
    return res.status(404).json({ message: "Client not found" });
  }
  console.log(client);
  return res.status(200).json(client);
}
