import type { NextApiRequest, NextApiResponse } from 'next';
import { readData, writeData } from './data'; // Funções para ler e gravar dados

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = readData();

  if (req.method === 'GET') {
    // Retorna todas as localizações registradas
    res.status(200).json(data.locations || []);
  } else if (req.method === 'POST') {
    // Extrai os campos enviados no corpo da requisição
    const { localName, location, ph, oxygenation, soilHumidity, airHumidity } = req.body;

    // Valida se todos os campos obrigatórios estão presentes
    if (!localName || !location || !location.latitude || !location.longitude || !ph || !oxygenation || !soilHumidity || !airHumidity) {
      res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      return;
    }

    // Cria uma nova entrada com data de cadastro
    const newEntry = {
      id: Date.now(),
      localName,
      location,
      ph,
      oxygenation,
      soilHumidity,
      airHumidity,
      date: new Date().toISOString(), // Adiciona a data de cadastro
    };

    // Adiciona a nova entrada ao array de localizações
    data.locations.push(newEntry);

    // Grava os dados atualizados no arquivo JSON
    writeData(data);

    // Retorna a nova entrada como resposta
    res.status(201).json(newEntry);
  } else {
    // Define os métodos permitidos
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Método ${req.method} não permitido.`);
  }
}