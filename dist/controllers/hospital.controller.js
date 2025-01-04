"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalController = void 0;
const hospitalRepositorio_1 = require("../infra/repositories/hospitalRepositorio");
class HospitalController {
    constructor() {
        this.HospitalRepository = new hospitalRepositorio_1.HospitalRepository();
    }
    async createHospital(req, res) {
        try {
            const user = null; //await this.userService.createUser(req.body);
            res.status(201).json(user);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao criar hospital" });
        }
    }
    async getHospital(req, res) {
        try {
            const id = parseInt(req.params.id);
            const user = await this.HospitalRepository.getHospitalById(id);
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).json({ error: "Hospital não encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar hospital" });
        }
    }
    async getHospitals(req, res) {
        try {
            const user = await this.HospitalRepository.getAllHospitals();
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar hospitais" });
        }
    }
}
exports.HospitalController = HospitalController;
