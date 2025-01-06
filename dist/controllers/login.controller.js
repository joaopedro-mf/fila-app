"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usuarioRepositorio_1 = require("../infra/repositories/usuarioRepositorio");
const documentoRepositorio_1 = require("../infra/repositories/documentoRepositorio");
class LoginController {
    constructor() {
        this.usuarioRepository = new usuarioRepositorio_1.UsuarioRepository();
        this.documentoRepository = new documentoRepositorio_1.DocumentosRepository();
    }
    generateToken(payload) {
        const secret = process.env.JWT_SECRET;
        const expiresIn = '1h'; // TODO: Validar tempo de expiração do token
        return jwt.sign(payload, secret, { expiresIn });
    }
    async createUsuario(req, res) {
        try {
            //TODO : Verificar se usuario existe
            //TODO : Verificar se informações são validas (email, cpf, data de nascimento, operadoraId)
            const currentDate = new Date();
            const comprovanteResidencia = {
                tipo: 5 /* DocumentoType.ComprovanteResidencia */.toString(),
                data: req.body.comprovanteResidencia,
                dataCriacao: currentDate.toISOString()
            };
            var comprovante = await this.documentoRepository.createDocument(comprovanteResidencia);
            const imagemPerfil = {
                tipo: 6 /* DocumentoType.ImagemPerfil */.toString(),
                data: req.body.imagemPerfil,
                dataCriacao: currentDate.toISOString()
            };
            var imagem = await this.documentoRepository.createDocument(imagemPerfil);
            const documentoAssinado = {
                tipo: 4 /* DocumentoType.CarteiraIdentificacao */.toString(),
                data: req.body.documentoAssinado,
                dataCriacao: currentDate.toISOString()
            };
            var carteira = await this.documentoRepository.createDocument(documentoAssinado);
            const newUsuario = {
                nome: req.body.nome,
                numeroCPF: req.body.cpf,
                dataNascimento: req.body.dataNascimento,
                email: req.body.email,
                numeroCartaoOperadora: req.body.numeroCarteira,
                ativo: true,
                status: "Ativo",
                cep: req.body.cep,
                endereco: req.body.endereco,
                numeroEndereco: req.body.numeroEndereco,
                complementoEndereco: req.body.complementoEndereco,
                telefone: req.body.telefone,
                operadoraId: req.body.operadoraId,
                password: await bcrypt.hash(req.body.senha, 8),
                comprovanteResidenciaDocumentoId: comprovante.id,
                identificacaoDocumentoId: carteira.id,
                imagemPerfil: imagem.id
            };
            await this.usuarioRepository.createUsuario(newUsuario);
            res.status(201).json({});
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro ao realizar cadastro do usuario" });
        }
    }
    async login(req, res) {
        try {
            const { cpf, password } = req.body;
            const usuarioSearch = {
                numeroCPF: cpf
            };
            var usuario = await this.usuarioRepository.getUsuario(usuarioSearch);
            if (!usuario) {
                res.status(401).json({ error: "Login não autorizado" });
                return;
            }
            const isMatch = await bcrypt.compare(password, usuario.password);
            if (!isMatch) {
                res.status(401).json({ error: "Login não autorizado" });
                return;
            }
            const payload = {
                usuarioId: usuario.id,
                cpf: usuario.numeroCPF,
                operadoraId: usuario.operadoraId
            };
            const token = this.generateToken(payload);
            res.status(200).json({ token: token });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro ao realizar login" });
        }
    }
}
exports.LoginController = LoginController;
