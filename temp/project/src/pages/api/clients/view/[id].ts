import type { NextApiRequest, NextApiResponse } from 'next'

import { fakeClients } from '@/components/fake/clients'
import { Client } from '@/types/client'


export default function handler(req: NextApiRequest, res: NextApiResponse<Client[]>) {
  const {id} = req.query
  res.status(200).json(fakeClients.filter(x=>x.id == id)[0])

}
