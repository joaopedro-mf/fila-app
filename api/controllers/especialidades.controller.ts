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
      const especialidade = await this.EspecialidadesRepository.getEspecialidadesById(id);
      if (especialidade) {
        res.json(especialidade);
      } else {
        res.status(404).json({ error: "Especialidade não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar especialidade" });
    }
  }

  async getEspecialidadess(req: Request, res: Response): Promise<void> {
    try {
      const hospitalId = parseInt(req.query?.hospitalId?.toString());
      
      const especialidade = !hospitalId || hospitalId == 0 ? await this.EspecialidadesRepository.getAllEspecialidades() : 
                                          await this.EspecialidadesRepository.getAllEspecialidadesPorHospital(hospitalId);

      res.json(especialidade);  
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar especialidade" });
    }
  }

    async getEspecialidadesPorHospital(req: Request, res: Response): Promise<void> {
    try {
      const hospitalId = parseInt(req.params.hospitalId);
      const especialidade = await this.EspecialidadesRepository.getAllEspecialidadesPorHospital(hospitalId);
        res.json(especialidade);  
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar especialidade" });
    }
  }

}