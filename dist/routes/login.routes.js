"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = require("../controllers/login.controller");
const multer = require("multer");
const router = (0, express_1.Router)();
const loginController = new login_controller_1.LoginController();
const upload = multer({
    limits: {
        fieldSize: 5 * 1024 * 1024 // Aumenta o limite para 5MB
    }
});
router.post("/new", upload.none(), loginController.createUsuario.bind(loginController));
router.post("/", loginController.login.bind(loginController));
exports.default = router;
