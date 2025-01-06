import { Request, Response } from 'express';
import { HospitalRepository } from "../infra/repositories/hospitalRepositorio";

export class HospitalController {
  private HospitalRepository: HospitalRepository;

  constructor() {
    this.HospitalRepository = new HospitalRepository();
  }

  async createHospital(req: Request, res: Response): Promise<void> {
    try {
      const user = null//await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar hospital" });
    }
  }

  async getHospital(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user = await this.HospitalRepository.getHospitalById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "Hospital não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar hospital" });
    }
  }

  async getHospitals(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body.tokenJwt.operadoraId)
      const hospitais = await this.HospitalRepository.getAllHospitals(req.body.tokenJwt.operadoraId);
        res.json(hospitais);  
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar hospitais" });
    }
  }

}