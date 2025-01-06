import { Request, Response } from "express";
import { GuiaRepository } from "../infra/repositories/guiaRepositorio";
import { Guia,UpdateGuia } from "../domain/entities/GuiaAtendimento";
import { Autorizacao } from "../domain/entities/Autorizacao";
import { GuiaStatus } from "../domain/Enums/GuiaStatus";
import { DocumentoType } from "../domain/Enums/DocumentoType";
import { NewDocumentoUsuario } from "../domain/entities/DocumentosUsuario";
import { DocumentosRepository } from "../infra/repositories/documentoRepositorio";
import  generateTokenQrCode  from "../domain/entities/QrCode"
import { getTokenInfo } from "../middlewares/authMiddleware"
import PDFDocument from 'pdfkit';
import {GuiaAutorizacaoPdf, gerarPDF } from '../domain/core/pdfTemplate'

export class GuiaController {
  private guiaRepository: GuiaRepository;
  private documentoRepository: DocumentosRepository;


  constructor() {
    this.guiaRepository = new GuiaRepository();
    this.documentoRepository = new DocumentosRepository();
  }

  async getGuiaByAutorizacao(req: Request, res: Response): Promise<void> {
    try {
        const criteria: Partial<Autorizacao> = {
            usuarioId : req.body.tokenJwt.usuarioId
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

      // TODO: Atualizar status guia quando o data expiração for atingida
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

      if(!req.body.documentoAssinadoBase64)
      {
        res.status(400).json({ error: "Assinatura não informada" })
        return
      }

      const currentDate: Date = new Date();

      const assinatura: NewDocumentoUsuario ={
        tipo: DocumentoType.Assinatura.toString(),
        data: req.body.documentoAssinadoBase64, 
        dataCriacao: currentDate.toISOString()
        }
      var assinaturaRef =  await this.documentoRepository.createDocument(assinatura)

      const biometria: NewDocumentoUsuario ={
        tipo: DocumentoType.Biometria.toString(),
        data: req.body.selfie, 
        dataCriacao: currentDate.toISOString()
        }   
      var biometriaRef =  await this.documentoRepository.createDocument(biometria)

      const infoToken = getTokenInfo(req)

      const tokenQrCode = generateTokenQrCode( infoToken.operadoraId, infoToken.usuarioId, id);

      const updateGuia: Partial<UpdateGuia> = {
        statusGuia : GuiaStatus.GeradoQrCode.toString(), 
        assinaturaDocumentoId : assinaturaRef.id,
        biometriaDocumentoId: biometriaRef.id,
        tokenQrCode: tokenQrCode 
      };
      
      this.guiaRepository.updateGuia(id, updateGuia)
    
      res.status(200).json({ qrCode: tokenQrCode });

    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Erro ao confirmar guia" });
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

  async getGuiaDocument(req: Request, res: Response):Promise<void>{
    try {
      const id = parseInt(req.params.id);
      const guia = await this.guiaRepository.getGuiaById(id);

      if (!guia) {
        res.status(404).json({ error: "Usuário não encontrado" });
        return
      }

      var autorizacaoSearch :Partial<Autorizacao> ={
        id: guia.autorizacaoId
      }

      const autorizacaoInfo = await this.guiaRepository.getGuiaByAutorizacao(autorizacaoSearch)

      const pdfRequest: GuiaAutorizacaoPdf =
      {
        nomePaciente: autorizacaoInfo[0].nome,
        numeroCartao: autorizacaoInfo[0].numeroCartaoOperadora,
        operadora: autorizacaoInfo[0].operadora,
        especialidade: autorizacaoInfo[0].especialidade,
        data: autorizacaoInfo[0].dataEmissao.toLocaleDateString('pt-BR')
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');

      gerarPDF(res,pdfRequest)
      // const options = { format: 'A4' };
      // const file = { content: getGuiaDocumentTemplate(pdfRequest) };

      // const pdfBuffer = await htmlPdf.generatePdf(file, options);

      // const pdfBuffer = await generatePdf(file, options);

      // res.send(pdfBuffer);

    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Erro ao gerar documento" });
    }
  }

}