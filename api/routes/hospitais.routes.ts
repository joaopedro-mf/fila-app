import { Router } from 'express';
import { get } from '../controller/hospitais.controller';

const router = Router();

router.get('/', get);

export default router;