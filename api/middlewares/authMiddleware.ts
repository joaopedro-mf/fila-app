import * as dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { TokenPayload } from "../domain/core/tokenJwt"


export const getTokenInfo = (req: Request) => {
    const authHeader = req.headers.authorization;

    const [, token] = authHeader.split(' ');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    
        return { "usuarioId": decoded.usuarioId, "operadoraId": decoded.operadoraId, "cpf": decoded.cpf };

      } catch (error) {
        console.log(error)
        throw(error)
      }

}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;

    if(!req.body.tokenJwt){
        req.body.tokenJwt = { }
    }

    req.body.tokenJwt.usuarioId = decoded.usuarioId;
    req.body.tokenJwt.operadoraId = decoded.operadoraId;
    req.body.tokenJwt.cpf = decoded.cpf;

    return next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// export default {authMiddleware, getTokenInfo};
