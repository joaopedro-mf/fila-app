import { Request, Response } from 'express';

export const get = (req: Request, res: Response) => {
  res.json({ message: 'Exemplo de resposta' });
};