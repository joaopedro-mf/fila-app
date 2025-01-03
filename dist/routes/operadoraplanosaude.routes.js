"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const operadoraplanosaude_controller_1 = require("../controllers/operadoraplanosaude.controller");
const router = (0, express_1.Router)();
const operadoraplanosaudeController = new operadoraplanosaude_controller_1.OperadoraPlanoSaudeController();
router.post("/", operadoraplanosaudeController.createOperadoraPlanoSaude.bind(operadoraplanosaudeController));
router.get("/:id", operadoraplanosaudeController.getOperadoraPlanoSaude.bind(operadoraplanosaudeController));
router.get("/", operadoraplanosaudeController.getOperadoraPlanoSaude.bind(operadoraplanosaudeController));
exports.default = router;
