import type { NextApiRequest, NextApiResponse } from 'next';
import { readData } from './data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;
  const data = readData();

  if (req.method === 'POST') {
    const user = data.users.find(
      (u: { username: string; password: string }) =>
        u.username === username && u.password === password
    );

    if (user) {
      res.status(200).json({ message: 'Login bem-sucedido' });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido.`);
  }
}