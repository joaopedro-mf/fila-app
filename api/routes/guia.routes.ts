import { Router } from 'express';
import { GuiaController  } from '../controllers/guia.controller';
import * as multer from 'multer';

const router = Router();
const guiaController = new GuiaController();

const upload = multer({
    limits: {
      fieldSize: 5 * 1024 * 1024 // Aumenta o limite para 5MB
    }
  });

router.post("/:id", upload.none(),guiaController.confirmGuia.bind(guiaController));
router.get("/:id", guiaController.getGuiaById.bind(guiaController));
router.get("/:id/document", guiaController.getGuiaDocument.bind(guiaController));
router.get("/", guiaController.getGuiaByAutorizacao.bind(guiaController));


export default router;