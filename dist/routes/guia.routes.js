"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const guia_controller_1 = require("../controllers/guia.controller");
const multer = require("multer");
const router = (0, express_1.Router)();
const guiaController = new guia_controller_1.GuiaController();
const upload = multer({
    limits: {
        fieldSize: 5 * 1024 * 1024 // Aumenta o limite para 5MB
    }
});
router.post("/:id", upload.none(), guiaController.confirmGuia.bind(guiaController));
router.get("/:id", guiaController.getGuiaById.bind(guiaController));
router.get("/:id/document", guiaController.getGuiaDocument.bind(guiaController));
router.get("/", guiaController.getGuiaByAutorizacao.bind(guiaController));
exports.default = router;
