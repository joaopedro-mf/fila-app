import { Router } from 'express';
import { OperadoraPlanoSaudeController  } from '../controllers/operadoraplanosaude.controller';

const router = Router();
const operadoraplanosaudeController = new OperadoraPlanoSaudeController();

router.post("/", operadoraplanosaudeController.createOperadoraPlanoSaude.bind(operadoraplanosaudeController));
router.get("/:id", operadoraplanosaudeController.getOperadoraPlanoSaude.bind(operadoraplanosaudeController));
router.get("/", operadoraplanosaudeController.getOperadoraPlanoSaude.bind(operadoraplanosaudeController));


export default router;