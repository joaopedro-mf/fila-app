import { Request, Response } from "express";
import { UsuarioRepository } from "../infra/repositories/usuarioRepositorio";

export class UsuarioController {
  private usuarioRepository: UsuarioRepository;

  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  async createUsuario(req: Request, res: Response): Promise<void> {
    try {
      const user = null//await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  async getUsuario(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user = await this.usuarioRepository.getUsuarioById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  async getUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.usuarioRepository.getAllUsuarios();
        res.json(user);  
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

}