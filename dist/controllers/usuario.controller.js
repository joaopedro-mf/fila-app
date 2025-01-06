"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const usuarioRepositorio_1 = require("../infra/repositories/usuarioRepositorio");
class UsuarioController {
    constructor() {
        this.usuarioRepository = new usuarioRepositorio_1.UsuarioRepository();
    }
    async getUsuario(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = await this.usuarioRepository.getUsuarioById(id);
            if (user) {
                var response = {
                    "nome": user.nome,
                    "numeroCPF": user.numeroCPF,
                    "dataNascimento": user.dataNascimento,
                    "email": user.email,
                    "numeroCartaoOperadora": user.numeroCartaoOperadora,
                    "cep": user.cep,
                    "endereco": user.endereco,
                    "complementoEndereco": user.complementoEndereco,
                    "numeroEndereco": user.numeroEndereco,
                    "telefone": user.telefone,
                    "status": user.status,
                };
                res.json(response);
            }
            else {
                res.status(404).json({ error: "Usuário não encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar usuário" });
        }
    }
    async UpdateUsuarios(req, res) {
        try {
            const dataToUpdate = {};
            var updateData = req.body;
            Object.keys(updateData).forEach(key => {
                console.log(key);
                if (updateData[key] !== undefined && key !== 'tokenJwt') {
                    dataToUpdate[key] = updateData[key];
                }
            });
            var usuarioUpdate = await this.usuarioRepository.updateUsuario(req.body.tokenJwt.usuarioId, dataToUpdate);
            res.json(usuarioUpdate);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar usuário" });
        }
    }
}
exports.UsuarioController = UsuarioController;
