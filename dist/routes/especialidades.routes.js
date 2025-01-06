"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const especialidades_controller_1 = require("../controllers/especialidades.controller");
const router = (0, express_1.Router)();
const especialidadesController = new especialidades_controller_1.EspecialidadesController();
router.get("/:hospitalId", especialidadesController.getEspecialidadesPorHospital.bind(especialidadesController));
router.get("/", especialidadesController.getEspecialidadess.bind(especialidadesController));
exports.default = router;
