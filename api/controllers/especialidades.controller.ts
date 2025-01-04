import { Request, Response } from 'express';
import { EspecialidadesRepository } from "../infra/repositories/especialidadesRepositorio";

export class EspecialidadesController {
  private EspecialidadesRepository: EspecialidadesRepository;

  constructor() {
    this.EspecialidadesRepository = new EspecialidadesRepository();
  }

  async createEspecialidades(req: Request, res: Response): Promise<void> {
    try {
      const user = null//await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar especialidade" });
    }
  }

  async getEspecialidades(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user = await this.EspecialidadesRepository.getEspecialidadesById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "Especialidade não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar especialidade" });
    }
  }

  async getEspecialidadess(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.EspecialidadesRepository.getAllEspecialidadess();
        res.json(user);  
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar especialidade" });
    }
  }

}