"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.getTokenInfo = void 0;
const jwt = require("jsonwebtoken");
const getTokenInfo = (req) => {
    const authHeader = req.headers.authorization;
    const [, token] = authHeader.split(' ');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { "usuarioId": decoded.usuarioId, "operadoraId": decoded.operadoraId, "cpf": decoded.cpf };
    }
    catch (error) {
        console.log(error);
        throw (error);
    }
};
exports.getTokenInfo = getTokenInfo;
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!req.body.tokenJwt) {
            req.body.tokenJwt = {};
        }
        req.body.tokenJwt.usuarioId = decoded.usuarioId;
        req.body.tokenJwt.operadoraId = decoded.operadoraId;
        req.body.tokenJwt.cpf = decoded.cpf;
        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Token inválido' });
    }
};
exports.authMiddleware = authMiddleware;
// export default {authMiddleware, getTokenInfo};
