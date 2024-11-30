import { Router } from 'express';
import { get } from '../controllers/hospitais.controller';

const router = Router();

router.get('/', get);

export default router;