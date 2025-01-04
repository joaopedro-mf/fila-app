"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperadoraPlanoSaudeController = void 0;
const operadoraplanosaudeRepositorio_1 = require("../infra/repositories/operadoraplanosaudeRepositorio");
class OperadoraPlanoSaudeController {
    constructor() {
        this.OperadoraPlanoSaudeRepository = new operadoraplanosaudeRepositorio_1.OperadoraPlanoSaudeRepository();
    }
    async createOperadoraPlanoSaude(req, res) {
        try {
            const user = null; //await this.userService.createUser(req.body);
            res.status(201).json(user);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao criar plano de saúde" });
        }
    }
    async getOperadoraPlanoSaude(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = await this.OperadoraPlanoSaudeRepository.getOperadoraPlanoSaudeById(id);
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).json({ error: "Plano de saúde não encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar plano de saúde" });
        }
    }
    async getOperadoraPlanoSaudes(req, res) {
        try {
            const user = await this.OperadoraPlanoSaudeRepository.getAllOperadoraPlanoSaudes();
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar planos de saúde" });
        }
    }
}
exports.OperadoraPlanoSaudeController = OperadoraPlanoSaudeController;
