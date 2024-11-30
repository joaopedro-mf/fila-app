import { Request, Response } from "express";
import { UserService } from "../infra/repositories/userRepository";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userService.findUserById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.getAllUsers();
        res.json(user);  
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

}