import { Router } from 'express';
import { EspecialidadesController  } from '../controllers/especialidades.controller';

const router = Router();
const especialidadesController = new EspecialidadesController();

router.get("/:hospitalId", especialidadesController.getEspecialidadesPorHospital.bind(especialidadesController));
router.get("/", especialidadesController.getEspecialidadess.bind(especialidadesController));


export default router;