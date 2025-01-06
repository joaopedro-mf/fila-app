"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutorizacaoController = void 0;
const autorizacaoRepositorio_1 = require("../infra/repositories/autorizacaoRepositorio");
const guiaRepositorio_1 = require("../infra/repositories/guiaRepositorio");
class AutorizacaoController {
    constructor() {
        this.autorizacaoRepository = new autorizacaoRepositorio_1.AutorizacaoRepository();
        this.guiaRepository = new guiaRepositorio_1.GuiaRepository();
    }
    async createAutorizacao(req, res) {
        try {
            // TODO: Validar se usuario já possui uma guia valida antes de gerar uma nova
            const currentDate = new Date();
            // TODO: Buscar usuario e vincular sua operadora
            const autorizacao = {
                usuarioId: req.body.tokenJwt.usuarioId,
                especialidadeId: req.body.especialidadeId,
                hospitalId: req.body.hospitalId,
                operadoraId: req.body.tokenJwt.operadoraId,
                statusAutorizacao: "Em processamento" /* AutorizacaoStatus.EmProcessamento */.toString(),
                dataSolicitacao: currentDate.toISOString()
            };
            var createdAutorizacao = await this.autorizacaoRepository.createAutorizacao(autorizacao);
            // TODO : implementar logica que seleciona e retorna autorizacao de acordo com operadora
            const simulatedRespondeOperadora = {
                "id": "123123",
                "dataValidade": currentDate.toISOString(),
                "statusGuia": "Aprovado"
            };
            const guia = {
                autorizacaoId: createdAutorizacao.id,
                dataEmissao: currentDate.toISOString(),
                dataValidade: simulatedRespondeOperadora.dataValidade,
                tokenQrCode: "",
                statusGuia: "Pendente Assinatura" /* GuiaStatus.PendenteAssinatura */.toString(),
            };
            var guiaCreated = await this.guiaRepository.createGuia(guia);
            res.status(201).json(guiaCreated);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro ao realizar autorizacao" });
        }
    }
}
exports.AutorizacaoController = AutorizacaoController;
