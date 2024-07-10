import { NextApiRequest, NextApiResponse } from 'next';
import data from "../../../public/fonte-de-dados-2.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(data);
};