import { Router } from 'express';
import { OperadoraPlanoSaudeController  } from '../controllers/operadoraplanosaude.controller';

const router = Router();
const operadoraplanosaudeController = new OperadoraPlanoSaudeController();

router.post("/", operadoraplanosaudeController.createOperadoraPlanoSaude.bind(operadoraplanosaudeController));
router.get("/:id", operadoraplanosaudeController.getOperadoraPlanoSaudeById.bind(operadoraplanosaudeController));
router.get("/", operadoraplanosaudeController.getOperadorasPlanoSaude.bind(operadoraplanosaudeController));


export default router;