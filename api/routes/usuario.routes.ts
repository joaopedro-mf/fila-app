import { Router } from 'express';
import { UsuarioController  } from '../controllers/usuario.controller';

const router = Router();
const usuarioController = new UsuarioController();

router.get("/:id", usuarioController.getUsuario.bind(usuarioController));
router.put("/", usuarioController.UpdateUsuarios.bind(usuarioController));

export default router;