import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { Usuario, NewUsuario } from "../domain/entities/Usuario";
import { DocumentoUsuario, NewDocumentoUsuario } from "../domain/entities/DocumentosUsuario";
import { UsuarioRepository } from "../infra/repositories/usuarioRepositorio";
import { DocumentosRepository } from "../infra/repositories/documentoRepositorio";
import { TokenPayload } from "../domain/core/tokenJwt"
import { DocumentoType } from "../domain/Enums/DocumentoType"



export class LoginController {
  private usuarioRepository: UsuarioRepository;
  private documentoRepository: DocumentosRepository;

  constructor() {
    this.usuarioRepository = new UsuarioRepository();
    this.documentoRepository = new DocumentosRepository();
  }

   generateToken(payload: TokenPayload): string {
    const secret = process.env.JWT_SECRET;
    const expiresIn = '1h'; // TODO: Validar tempo de expiração do token
  
    return jwt.sign(payload, secret, { expiresIn });
  }

  async createUsuario(req: Request, res: Response): Promise<void> {
    try {
 
       //TODO : Verificar se usuario existe
       //TODO : Verificar se informações são validas (email, cpf, data de nascimento, operadoraId)
       const currentDate: Date = new Date();

       const comprovanteResidencia: NewDocumentoUsuario ={
            tipo: DocumentoType.ComprovanteResidencia.toString(),
            data: req.body.comprovanteResidencia, 
            dataCriacao: currentDate.toISOString()
        }
       var comprovante =  await this.documentoRepository.createDocument(comprovanteResidencia)

       const imagemPerfil: NewDocumentoUsuario ={
        tipo: DocumentoType.ImagemPerfil.toString(),
        data: req.body.imagemPerfil, 
        dataCriacao: currentDate.toISOString()
        }   
       var imagem =  await this.documentoRepository.createDocument(imagemPerfil)


        const documentoAssinado: NewDocumentoUsuario ={
        tipo: DocumentoType.CarteiraIdentificacao.toString(),
        data: req.body.documentoAssinado, 
        dataCriacao: currentDate.toISOString()
        }   
       var carteira =  await this.documentoRepository.createDocument(documentoAssinado)
       
       const newUsuario: NewUsuario = {
        nome: req.body.nome,
        numeroCPF:req.body.cpf,
        dataNascimento: req.body.dataNascimento,
        email:req.body.email,
        numeroCartaoOperadora: req.body.numeroCarteira,
        ativo: true,
        status: "Ativo",
        cep: req.body.cep,
        endereco: req.body.endereco,
        numeroEndereco: req.body.numeroEndereco,
        complementoEndereco:req.body.complementoEndereco,
        telefone:req.body.telefone,
        operadoraId: req.body.operadoraId,
        password:  await bcrypt.hash(req.body.senha, 8), 
        comprovanteResidenciaDocumentoId: comprovante.id,
        identificacaoDocumentoId:carteira.id,
        imagemPerfil: imagem.id
        };

       await this.usuarioRepository.createUsuario(newUsuario)

       res.status(201).json({});

    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Erro ao realizar cadastro do usuario" });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {

        const { cpf, password } = req.body;

        const usuarioSearch : Partial<Usuario> = {
            numeroCPF: cpf
        }

        var usuario = await this.usuarioRepository.getUsuario(usuarioSearch)
        if(!usuario) {
            res.status(401).json({ error: "Login não autorizado" })
            return
        }

        const isMatch = await bcrypt.compare(password, usuario.password);
        if(!isMatch) {
            res.status(401).json({ error: "Login não autorizado" })
            return
        }

        const payload: TokenPayload = {
            usuarioId: usuario.id,
            cpf: usuario.numeroCPF,
            operadoraId: usuario.operadoraId
          };
        
        const token = this.generateToken(payload);

        res.status(200).json({token: token});

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao realizar login" });
    }
  }
}
