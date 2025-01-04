"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuiaController = void 0;
const guiaRepositorio_1 = require("../infra/repositories/guiaRepositorio");
const autorizacaoRepositorio_1 = require("../infra/repositories/autorizacaoRepositorio");
class GuiaController {
    constructor() {
        this.guiaRepository = new guiaRepositorio_1.GuiaRepository();
        this.autorizacaoRepository = new autorizacaoRepositorio_1.AutorizacaoRepository();
    }
    async getGuiaByAutorizacao(req, res) {
        try {
            const idUsuario = parseInt(req.query.idUsuario);
            if (idUsuario == 0)
                res.status(500).json({ error: "Erro ao buscar usuário" });
            const criteria = {
                usuarioId: idUsuario
            };
            const guia = await this.guiaRepository.getGuiaByAutorizacao(criteria);
            if (guia) {
                res.json(guia);
            }
            else {
                res.status(404).json({ error: "Guia não encontrada" });
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar guia" });
        }
    }
    async getGuiaById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const guia = await this.guiaRepository.getGuiaById(id);
            if (guia) {
                res.json(guia);
            }
            else {
                res.status(404).json({ error: "Guia não encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar guia" });
        }
    }
    async confirmGuia(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (!req.body.assinatura) {
                res.status(400).json({ error: "Assinatura não informada" });
                return;
            }
            //TODO: Realizar metodo que gera token QrCode
            const updateGuia = {
                statusGuia: 2 /* GuiaStatus.GeradoQrCode */.toString(),
                assinatura: req.body.assinatura,
                tokenQrCode: ""
            };
            this.guiaRepository.updateGuia(id, updateGuia);
            // TODO: Retornar string com codigo qrcode
            res.status(200).json({ qrCode: "" });
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar usuário" });
        }
    }
    async updateGuia(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = await this.guiaRepository.getGuiaById(id);
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).json({ error: "Usuário não encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar usuário" });
        }
    }
}
exports.GuiaController = GuiaController;
