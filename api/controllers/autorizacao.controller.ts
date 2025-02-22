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
            usuarioId: req.body.tokenJwt.usuarioId,
            especialidadeId: req.body.especialidadeId,
            hospitalId: req.body.hospitalId,
            operadoraId: req.body.tokenJwt.operadoraId,
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
            dataEmissao: currentDate.toISOString(),
            dataValidade: simulatedRespondeOperadora.dataValidade,
            tokenQrCode: "",
            statusGuia: GuiaStatus.PendenteAssinatura.toString(), 
        };

      var guiaCreated =  await this.guiaRepository.createGuia(guia)

       res.status(201).json(guiaCreated);

    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Erro ao realizar autorizacao" });
    }
  }

}
