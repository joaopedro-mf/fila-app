import { Router } from 'express';
import { EspecialidadesController  } from '../controllers/especialidades.controller';

const router = Router();
const especialidadesController = new EspecialidadesController();

router.post("/", especialidadesController.createEspecialidades.bind(especialidadesController));
router.get("/:id", especialidadesController.getEspecialidades.bind(especialidadesController));
router.get("/", especialidadesController.getEspecialidadess.bind(especialidadesController));


export default router;