import { Router } from 'express';
import { LoginController } from '../controllers/login.controller';
import * as multer from 'multer';


const router = Router();
const loginController = new LoginController();

const upload = multer({
    limits: {
      fieldSize: 5 * 1024 * 1024 // Aumenta o limite para 5MB
    }
  });

router.post("/new", upload.none(),loginController.createUsuario.bind(loginController));
router.post("/", loginController.login.bind(loginController));

export default router;