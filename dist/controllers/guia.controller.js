"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuiaController = void 0;
const guiaRepositorio_1 = require("../infra/repositories/guiaRepositorio");
const documentoRepositorio_1 = require("../infra/repositories/documentoRepositorio");
const QrCode_1 = require("../domain/entities/QrCode");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const html_pdf_node_1 = require("html-pdf-node");
const pdfTemplate_1 = require("../domain/core/pdfTemplate");
class GuiaController {
    constructor() {
        this.guiaRepository = new guiaRepositorio_1.GuiaRepository();
        this.documentoRepository = new documentoRepositorio_1.DocumentosRepository();
    }
    async getGuiaByAutorizacao(req, res) {
        try {
            const criteria = {
                usuarioId: req.body.tokenJwt.usuarioId
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
            // TODO: Atualizar status guia quando o data expiração for atingida
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
            if (!req.body.documentoAssinadoBase64) {
                res.status(400).json({ error: "Assinatura não informada" });
                return;
            }
            const currentDate = new Date();
            const assinatura = {
                tipo: 1 /* DocumentoType.Assinatura */.toString(),
                data: req.body.documentoAssinadoBase64,
                dataCriacao: currentDate.toISOString()
            };
            var assinaturaRef = await this.documentoRepository.createDocument(assinatura);
            const biometria = {
                tipo: 2 /* DocumentoType.Biometria */.toString(),
                data: req.body.selfie,
                dataCriacao: currentDate.toISOString()
            };
            var biometriaRef = await this.documentoRepository.createDocument(biometria);
            const infoToken = (0, authMiddleware_1.getTokenInfo)(req);
            const tokenQrCode = (0, QrCode_1.default)(infoToken.operadoraId, infoToken.usuarioId, id);
            const updateGuia = {
                statusGuia: "Gerado Qr Code" /* GuiaStatus.GeradoQrCode */.toString(),
                assinaturaDocumentoId: assinaturaRef.id,
                biometriaDocumentoId: biometriaRef.id,
                tokenQrCode: tokenQrCode
            };
            this.guiaRepository.updateGuia(id, updateGuia);
            res.status(200).json({ qrCode: tokenQrCode });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro ao confirmar guia" });
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
    async getGuiaDocument(req, res) {
        try {
            const id = parseInt(req.params.id);
            const guia = await this.guiaRepository.getGuiaById(id);
            if (!guia) {
                res.status(404).json({ error: "Usuário não encontrado" });
                return;
            }
            var autorizacaoSearch = {
                id: guia.autorizacaoId
            };
            const autorizacaoInfo = await this.guiaRepository.getGuiaByAutorizacao(autorizacaoSearch);
            const pdfRequest = {
                nomePaciente: autorizacaoInfo[0].nome,
                plano: autorizacaoInfo[0].numeroCartaoOperadora,
                operadora: autorizacaoInfo[0].operadora,
                especialidade: autorizacaoInfo[0].especialidade,
                dataEmissao: autorizacaoInfo[0].dataEmissao.toLocaleDateString('pt-BR')
            };
            const options = { format: 'A4' };
            const file = { content: (0, pdfTemplate_1.getGuiaDocumentTemplate)(pdfRequest) };
            const pdfBuffer = await (0, html_pdf_node_1.generatePdf)(file, options);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
            res.send(pdfBuffer);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro ao gerar documento" });
        }
    }
}
exports.GuiaController = GuiaController;
