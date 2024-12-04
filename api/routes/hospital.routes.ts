import { Router } from 'express';
import { get } from '../controllers/hospital.controller';

const router = Router();

router.get('/', get);

export default router;