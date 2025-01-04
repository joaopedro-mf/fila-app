import { Request, Response } from "express";
import { GuiaRepository } from "../infra/repositories/guiaRepositorio";
import { AutorizacaoRepository } from "../infra/repositories/autorizacaoRepositorio";
import { UpdateGuia } from "../domain/entities/GuiaAtendimento";
import { Autorizacao } from "../domain/entities/Autorizacao";
import { GuiaStatus } from "../domain/Enums/GuiaStatus";

export class GuiaController {
  private guiaRepository: GuiaRepository;
  private autorizacaoRepository: AutorizacaoRepository;

  constructor() {
    this.guiaRepository = new GuiaRepository();
    this.autorizacaoRepository = new AutorizacaoRepository();
  }

  async getGuiaByAutorizacao(req: Request, res: Response): Promise<void> {
    try {
        const idUsuario = parseInt(req.query.idUsuario as string);

        if(idUsuario == 0)
            res.status(500).json({ error: "Erro ao buscar usuário" });

        const criteria: Partial<Autorizacao> = {
            usuarioId : idUsuario
        };

        const guia = await this.guiaRepository.getGuiaByAutorizacao(criteria);

        if (guia) {
            res.json(guia);
        } else {
            res.status(404).json({ error: "Guia não encontrada" });
        }
        } catch (error) {
        res.status(500).json({ error: "Erro ao buscar guia" });
        }
  }

  async getGuiaById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const guia = await this.guiaRepository.getGuiaById(id);
      if (guia) {
        res.json(guia);
      } else {
        res.status(404).json({ error: "Guia não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar guia" });
    }
  }

  async confirmGuia(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      if(!req.body.assinatura)
      {
        res.status(400).json({ error: "Assinatura não informada" })
        return
      }

      //TODO: Realizar metodo que gera token QrCode
      const updateGuia: Partial<UpdateGuia> = {
        statusGuia : GuiaStatus.GeradoQrCode.toString(), 
        assinatura : req.body.assinatura,
        tokenQrCode: ""
      };
      
      this.guiaRepository.updateGuia(id, updateGuia)
    
      // TODO: Retornar string com codigo qrcode
      res.status(200).json({ qrCode: "" });

    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  async updateGuia(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user = await this.guiaRepository.getGuiaById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

}