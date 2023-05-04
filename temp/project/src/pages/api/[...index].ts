import type { NextApiRequest, NextApiResponse } from "next";
import { fakeClients } from "@/components/fake/clients";

async function fetchWithTimeout(url: string, options?: RequestInit, timeout = 3000): Promise<globalThis.Response | unknown> {
  return await Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout)
    )
  ]);

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.url?.replace("/api", "");
  const query = req.query;
  const body = req.body;
  const mother = req.method
  const BackEndUrl = process.env.BACK_END_URL
  console.log({mother, url, query, body});
  if (mother === "GET") {
    try {
      const response = await fetchWithTimeout(`${BackEndUrl}${url}`) as globalThis.Response
      const json = await response.json()
      return res.status(response.status).json(json)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  res.status(200).json({ mother, url, query, body })
}
