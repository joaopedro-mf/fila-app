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
            const especialidade = await this.EspecialidadesRepository.getEspecialidadesById(id);
            if (especialidade) {
                res.json(especialidade);
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
        var _a, _b;
        try {
            const hospitalId = parseInt((_b = (_a = req.query) === null || _a === void 0 ? void 0 : _a.hospitalId) === null || _b === void 0 ? void 0 : _b.toString());
            const especialidade = !hospitalId || hospitalId == 0 ? await this.EspecialidadesRepository.getAllEspecialidades() :
                await this.EspecialidadesRepository.getAllEspecialidadesPorHospital(hospitalId);
            res.json(especialidade);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar especialidade" });
        }
    }
    async getEspecialidadesPorHospital(req, res) {
        try {
            const hospitalId = parseInt(req.params.hospitalId);
            const especialidade = await this.EspecialidadesRepository.getAllEspecialidadesPorHospital(hospitalId);
            res.json(especialidade);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar especialidade" });
        }
    }
}
exports.EspecialidadesController = EspecialidadesController;
