"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hospital_controller_1 = require("../controllers/hospital.controller");
const router = (0, express_1.Router)();
router.get('/', hospital_controller_1.get);
exports.default = router;
