import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

const filePath = path.join(process.cwd(), 'data.json');

export const readData = () => {
  if (!fs.existsSync(filePath)) {
    // Arquivo inicial vazio
    const initialData = { users: [], locations: [] };
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
  }
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
};

export const writeData = (data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// API para manipular o arquivo JSON
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const data = readData();
      res.status(200).json(data);
    } else if (req.method === 'POST') {
      const newData = req.body;
      writeData(newData);
      res.status(201).json({ message: 'Dados atualizados com sucesso!' });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Método ${req.method} não permitido.`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar os dados.' });
  }
}