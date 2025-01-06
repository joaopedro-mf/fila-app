"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const generateTokenQrCode = (operadoraId, usarioId, guiaId) => {
    const secret = process.env.JWT_SECRET;
    const currentDate = new Date();
    var payload = {
        "operadoraId": operadoraId,
        "usuarioId": usarioId,
        "guiaId": guiaId,
        "date": currentDate.toISOString()
    };
    return jwt.sign(payload, secret);
};
exports.default = generateTokenQrCode;
