import { Request, Response } from 'express';
import { OperadoraPlanoSaudeRepository } from "../infra/repositories/operadoraplanosaudeRepositorio";

export class OperadoraPlanoSaudeController {
  private OperadoraPlanoSaudeRepository: OperadoraPlanoSaudeRepository;

  constructor() {
    this.OperadoraPlanoSaudeRepository = new OperadoraPlanoSaudeRepository();
  }

  async createOperadoraPlanoSaude(req: Request, res: Response): Promise<void> {
    try {
      const user = null//await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar plano de saúde" });
    }
  }

  async getOperadoraPlanoSaudeById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user = await this.OperadoraPlanoSaudeRepository.getOperadoraPlanoSaudeById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "Plano de saúde não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar plano de saúde" });
    }
  }

  async getOperadorasPlanoSaude(req: Request, res: Response): Promise<void> {
    try {
      const operadora = await this.OperadoraPlanoSaudeRepository.getAllOperadoraPlanoSaudes();
        res.json(operadora);  
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Erro ao buscar planos de saúde" });
    }
  }

}