import { Router } from 'express';
import { UsuarioController  } from '../controllers/usuario.controller';

const router = Router();
const usuarioController = new UsuarioController();

router.post("/", usuarioController.createUsuario.bind(usuarioController));
router.get("/:id", usuarioController.getUsuario.bind(usuarioController));
router.get("/", usuarioController.getUsuarios.bind(usuarioController));


export default router;