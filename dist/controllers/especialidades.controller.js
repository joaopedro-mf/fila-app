"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EspecialidadesController = void 0;
const especialidadesRepositorio_1 = require("../infra/repositories/especialidadesRepositorio");
class EspecialidadesController {
    constructor() {
        this.EspecialidadesRepository = new especialidadesRepositorio_1.EspecialidadesRepository();
    }
    async createEspecialidades(req, res) {
        try {
            const user = null; //await this.userService.createUser(req.body);
            res.status(201).json(user);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao criar especialidade" });
        }
    }
    async getEspecialidades(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = await this.EspecialidadesRepository.getEspecialidadesById(id);
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).json({ error: "Especialidade não encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar especialidade" });
        }
    }
    async getEspecialidadess(req, res) {
        try {
            const user = await this.EspecialidadesRepository.getAllEspecialidadess();
            res.json(user);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Erro ao buscar especialidade" });
        }
    }
}
exports.EspecialidadesController = EspecialidadesController;
