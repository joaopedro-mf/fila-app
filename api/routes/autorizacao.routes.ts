import { Router } from 'express';
import { AutorizacaoController  } from '../controllers/autorizacao.controller';

const router = Router();
const autorizacaoController = new AutorizacaoController();

router.post("/", autorizacaoController.createAutorizacao.bind(autorizacaoController));


export default router;