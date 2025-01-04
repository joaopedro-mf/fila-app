import { Router } from 'express';
import { GuiaController  } from '../controllers/guia.controller';

const router = Router();
const guiaController = new GuiaController();

router.post("/", guiaController.confirmGuia.bind(guiaController));
router.get("/:id", guiaController.getGuiaById.bind(guiaController));
router.get("/", guiaController.getGuiaByAutorizacao.bind(guiaController));


export default router;