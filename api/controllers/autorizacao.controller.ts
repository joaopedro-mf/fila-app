import { Request, Response } from "express";
import { AutorizacaoRepository } from "../infra/repositories/autorizacaoRepositorio";
import { GuiaRepository } from "../infra/repositories/guiaRepositorio";
import { NewAutorizacao } from "../domain/entities/Autorizacao";
import { NewGuia } from "../domain/entities/GuiaAtendimento";
import { GuiaStatus } from "../domain/Enums/GuiaStatus";
import { AutorizacaoStatus } from "../domain/Enums/AutorizacaoStatus";

export class AutorizacaoController {
  private autorizacaoRepository: AutorizacaoRepository;
  private guiaRepository: GuiaRepository;

  constructor() {
    this.autorizacaoRepository = new AutorizacaoRepository();
    this.guiaRepository = new GuiaRepository();
  }

  async createAutorizacao(req: Request, res: Response): Promise<void> {
    try {

        // TODO: Validar se usuario já possui uma guia valida antes de gerar uma nova
        const currentDate: Date = new Date();

        // TODO: Buscar usuario e vincular sua operadora
        const autorizacao: NewAutorizacao = {
            usuarioId: req.body.idUsuario,
            especialidadeId: req.body.especialidadeId,
            hospitalId: req.body.hospitalId,
            operadoraId: 1, // TODO : PEGAR DO TOKEN 
            statusAutorizacao: AutorizacaoStatus.EmProcessamento.toString(),
            dataSolicitacao: currentDate.toISOString()
        };

        var createdAutorizacao = await this.autorizacaoRepository.createAutorizacao(autorizacao)

        // TODO : implementar logica que seleciona e retorna autorizacao de acordo com operadora
        const simulatedRespondeOperadora:any = {
            "id": "123123",
            "dataValidade": currentDate.toISOString(),
            "statusGuia": "Aprovado"
          }

        const guia: NewGuia = {
            autorizacaoId: createdAutorizacao.id,
            identificadorGuia: simulatedRespondeOperadora.id,
            dataEmissao: currentDate.toISOString(),
            dataValidade: simulatedRespondeOperadora.dataValidade,
            tokenQrCode: "", // TODO : Gerar string para codigo do token 
            statusGuia: GuiaStatus.PendenteAssinatura.toString(), 
            autorizadorResponsavel: autorizacao.operadoraId.toString() 
        };

       await this.guiaRepository.createGuia(guia)

       res.status(201).json(guia);

    } catch (error) {
      res.status(500).json({ error: "Erro ao realizar autorizacao" });
    }
  }

}
