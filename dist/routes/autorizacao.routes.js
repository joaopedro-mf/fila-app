"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autorizacao_controller_1 = require("../controllers/autorizacao.controller");
const router = (0, express_1.Router)();
const autorizacaoController = new autorizacao_controller_1.AutorizacaoController();
router.post("/", autorizacaoController.createAutorizacao.bind(autorizacaoController));
exports.default = router;
