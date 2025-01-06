"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario.controller");
const router = (0, express_1.Router)();
const usuarioController = new usuario_controller_1.UsuarioController();
router.get("/:id", usuarioController.getUsuario.bind(usuarioController));
router.put("/", usuarioController.UpdateUsuarios.bind(usuarioController));
exports.default = router;
