"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const usuarioRepositorio_1 = require("../infra/repositories/usuarioRepositorio");
class UsuarioController {
    constructor() {
        this.usuarioRepository = new usuarioRepositorio_1.UsuarioRepository();
    }
    async createUsuario(req, res) {
        try {
            const user = null; //await this.userService.createUser(req.body);
            res.status(201).json(user);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao criar usuário" });
        }
    }
    async getUsuario(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = await this.usuarioRepository.getUsuarioById(id);
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
    async getUsuarios(req, res) {
        try {
            const user = await this.usuarioRepository.getAllUsuarios();
            res.json(user);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro ao buscar usuário" });
        }
    }
}
exports.UsuarioController = UsuarioController;
