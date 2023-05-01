import type { NextApiRequest, NextApiResponse } from 'next'

import { fakeClients } from '@/components/fake/clients'
import { Client } from '@/types/client'


export default function handler(req: NextApiRequest, res: NextApiResponse<Client[]>) {
  const { method } = req

  switch (method) {
    case 'GET':
      res.status(200).json(fakeClients)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
